import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { DESTINATION } from './Destination';
import { COLOR } from '../Constrains/COLOR';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';
import BottomSheet from 'react-native-simple-bottom-sheet';

export const ListPages = ({ provideinfo, funcformodalopen }) => {
    const [locationdist, setlocationdist] = useState([]);
    //console.log("ding ding >>>>>>>>>",provideinfo)
    useEffect(() => {
        if (Object.keys(provideinfo).length > 0) {
            const placesArray = Object.keys(provideinfo).map((key) => ({
                key: key,
                distance: provideinfo[key].info.distance,
                duration: provideinfo[key].info.duration,
                titles: provideinfo[key].titles,
                latitudes: provideinfo[key].latitudes,
                longitudes: provideinfo[key].longitudes,
                review: provideinfo[key].review
            }));

            // Sort the array based on the 'duration' property
            placesArray.sort((a, b) => a.distance - b.distance);
            // console.log("place info ======================= ",placesArray)


            // Update the state with the sorted keys
            setlocationdist(placesArray);
        }
    }, [provideinfo]);
    const heythere = (item) => {
        console.log("ok parfect", item)
        funcformodalopen(item)
    }

    return (
        <BottomSheet isOpen wrapperStyle={{backgroundColor:"#EEEEEE"}}>
            <ScrollView>
            {locationdist.length > 0 ? (
                <View style={{ alignItems: "center" }}>
                    {locationdist.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={() => heythere(item)}
                        >
                            <Text style={styles.card_text}>{item.titles}</Text>
                            <Text style={styles.card_text}>Distance: {item.distance} meters</Text>
                            <Text style={styles.card_text}>Duration: {item.duration} min</Text>
                            <AirbnbRating
                                count={5}
                                reviews={["Bad", "OK", "Good", "Very Good", "Amazing",]}
                                defaultRating={item.review}
                                size={25}
                                starImage={require('../img/ratt.jpg')}
                                selectedColor="orange"
                                showRating={false}
                                isDisabled={true}

                            />
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <View>
                    <Spinner
                        visible={true}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerText}
                    />
                </View>
            )}
        </ScrollView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '80%',
        height: 150,
        alignItems: "center",
        padding: 10,
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: '#000',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.176)',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 1,
        shadowRadius: 48,
        elevation: 2, // For Android
    },
    card_text: {
        position: "relative",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    }
});
