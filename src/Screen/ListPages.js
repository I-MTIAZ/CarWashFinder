import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Colorf } from '../Constrains/COLOR';
import { AirbnbRating } from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';
import BottomSheet from 'react-native-simple-bottom-sheet';
const { height } = Dimensions.get("window");
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

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
        <BottomSheet
            isOpen wrapperStyle={{ backgroundColor: Colorf.b, }}
            lineStyle={{ backgroundColor: Colorf.c }}
        >
            <ScrollView style={{ flex: 1 }}>
                {/* <Text style={{ textAlign: "center", fontSize: height / 35, color: Colorf.c, fontWeight: "500", margin: '2%' }}>Nearest Places from your location</Text> */}
                {locationdist.length > 0 ? (
                    <View style={{ alignItems: "center" }}>
                        {locationdist.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.card}
                                onPress={() => heythere(item)}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <FontAwesome6 name="location-dot" size={height / 35} color={Colorf.c} style={{marginRight:'2%'}} />
                                    <Text style={[styles.card_text,{marginBottom:0}]}>{item.titles}</Text>

                                </View>
                                <Text style={styles.card_text}>Distance: {item.distance} meters</Text>
                                <Text style={styles.card_text}>Duration: {item.duration} min</Text>
                                <AirbnbRating
                                    count={5}
                                    defaultRating={item.review}
                                    size={height / 30}
                                    starImage={require('../img/ratt.jpg')}
                                    selectedColor="black"
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
        width: '90%',
        height: height / 4.5,
        alignItems: "center",
        padding: '2%',
        marginBottom: '3%',
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.176)',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 1,
        shadowRadius: 48,
        elevation: 2, // For Android
    },
    card_text: {
        fontSize: height / 35,
        fontWeight: "500",
        marginVertical: '2%',
        color: Colorf.c,
    }
});
