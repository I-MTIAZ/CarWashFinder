import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import CustomBtn from './CustomBtn';
import { COLOR } from '../Constrains/COLOR';
import { Rating, AirbnbRating } from 'react-native-ratings';
const transparent = 'rgba(0,0,0,0.5)'
import { All_Review } from './All_Review';

export const MODAL = ({ value, close_btn, confirm_btn, routedistance, locationame, star }) => {
    const [act_rev, setact_rev] = useState(false)
    ///sent data
    const sentclose = () => {
        close_btn(false);
    }

    ///sent confirm data
    const sentconfirm = () => {
        confirm_btn(true);
    }

    const Showrev = () => {
        setact_rev(true)
    }



    return (
        <View>
            <Modal visible={value} animationType='slide' transparent={true}>
                {
                    routedistance && locationame && star ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                            <View
                                style={{
                                    backgroundColor: transparent,
                                    padding: 15,
                                    width: act_rev ? '90%' : '90%',
                                    height: act_rev ? '100%' : '70%',
                                    borderRadius: 10,

                                }}>
                                {
                                    act_rev ? (
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", color: "white" }}>{locationame}</Text>
                                                <TouchableOpacity
                                                    style={{
                                                        height: 50,
                                                        width: 100,
                                                        backgroundColor: "red",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                    onPress={() => setact_rev(false)}
                                                >
                                                    <Text style={{ fontSize: 20, color: "snow", fontWeight: "bold" }}>CLOSE</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <All_Review
                                                locationname={locationame}
                                            />
                                        </View>



                                    ) :
                                        <View>
                                            <Text style={{ fontSize: 25, color: COLOR.Snow }}>{locationame}</Text>
                                            <Text style={{ fontSize: 20, color: COLOR.Snow, marginTop: 5 }}>Distance {routedistance.dist} meter</Text>
                                            <Text style={{ fontSize: 20, color: COLOR.Snow, marginTop: 5 }}>Duration {routedistance.duration} minutes</Text>
                                            <AirbnbRating
                                                count={5}
                                                reviews={["Bad", "OK", "Good", "Very Good", "Amazing",]}
                                                defaultRating={star}
                                                size={25}
                                                starImage={require('../img/ratt.jpg')}
                                                selectedColor="orange"
                                                showRating={false}
                                                isDisabled={true}

                                            />
                                            <Text style={{ fontSize: 20, color: COLOR.Snow, marginTop: 5 }}>open time : 5 am to 5 pm</Text>
                                            <View style={{ marginTop: 20 }}>
                                                <TouchableOpacity style={{
                                                    height: '30%', width: '100%', backgroundColor: COLOR.Snow,
                                                    alignItems: "center", justifyContent: "center"
                                                }}
                                                    onPress={() => sentclose()}
                                                >
                                                    <Text style={{ fontSize: 25 }}>close</Text>

                                                </TouchableOpacity>
                                                <TouchableOpacity style={{
                                                    height: '30%', width: '100%', backgroundColor: COLOR.SeaGreen,
                                                    alignItems: "center", justifyContent: "center", marginTop: 20
                                                }}
                                                    onPress={() => sentconfirm()}
                                                >
                                                    <Text style={{ fontSize: 25 }}>Confirm</Text>

                                                </TouchableOpacity>
                                                <TouchableOpacity style={{
                                                    alignItems: "center", justifyContent: "center", marginTop: 10
                                                }}
                                                    onPress={() => Showrev()}
                                                >
                                                    <Text style={{ fontSize: 20, color: "snow", fontWeight: "bold" }}>See Other's Review</Text>

                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                }
                            </View>
                        </View>
                    ) : (<Text>wait</Text>)
                }
            </Modal>
        </View>
    );
}



const styles = StyleSheet.create({});
