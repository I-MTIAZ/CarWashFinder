import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView,TouchableOpacity } from 'react-native';
import { DESTINATION } from './Destination';
import * as geolib from 'geolib';
import { COLOR } from '../Constrains/COLOR';

export const ListPages = ({ provideloc,PlaceLoc,funcformodalopen }) => {
    const [locationdist, setlocationdist] = useState([]);
    //console.log("ding ding >>>>>>>>>",PlaceLoc)
    useEffect(() => {
        // Calculate current location to destination distance only if provideloc is available
        if (provideloc && provideloc.latitude && provideloc.longitude) {
            const distances = PlaceLoc.map((item, index) => {
                const destination =item;
                if (destination.latitudes && destination.longitudes) {
                    return {
                        titles: item.titles,
                        distance: geolib.getDistance(
                            { latitude: provideloc.latitude, longitude: provideloc.longitude },
                            { latitude: destination.latitudes, longitude: destination.longitudes }
                        ),
                        latitudes:item.latitudes,
                        longitudes:item.longitudes
                    };
                } else {
                    return {
                        title: item.titles,
                        distance: 0, // Handle cases where coordinates are missing or invalid
                    };
                }
            });

            // Sort the distances from smallest to largest
            distances.sort((a, b) => a.distance - b.distance);

            setlocationdist(distances);
        }
    }, [provideloc]);
    const heythere = (item)=>{
        console.log("ok parfect",item)
        funcformodalopen(item)
    }

    return (
        <ScrollView>
            {
                locationdist.length > 0 ? (
                    <View style={{ alignItems: "center" }}>
                        {locationdist.map((item, index) => (
                            <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={()=>heythere(item)}
                        >
                            <Text style={styles.card_text}>{item.titles}</Text>
                            <Text style={styles.card_text}>Distance: {item.distance} meters</Text>
                        </TouchableOpacity>
                            
                        ))}
                    </View>

                ) : (<View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>)
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '80%',
        height: 100,
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
