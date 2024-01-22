import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Colorf } from '../Constrains/COLOR';
import { AirbnbRating } from 'react-native-ratings';
import { Button, Appbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

import { All_Review } from './All_Review';
const transparent = Colorf.b
const { height } = Dimensions.get("window");
const info = "is simply dummy text of the printing and typesetting industry. "

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
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '2%' : 0 }}>
            <Modal visible={value} animationType='slide' transparent={true}>
                {
                    routedistance && locationame && star ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                            <View
                                style={{
                                    backgroundColor: transparent,
                                    width: '100%',
                                    height: '100%'
                                }}>
                                {
                                    act_rev ? (
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Appbar.Header style={{ backgroundColor: Colorf.b }}>
                                                    <Appbar.BackAction onPress={() => setact_rev(false)} />
                                                </Appbar.Header>

                                                <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
                                                    <View style={{ flexDirection: "row-reverse" }}>
                                                        <Text style={{ fontSize: height / 30, fontWeight: 'bold', color: Colorf.c,marginHorizontal:'2%' }}>
                                                            {locationame}
                                                        </Text>
                                                        <Entypo name="location" size={height / 30} color={Colorf.c} />
                                                    </View>
                                                </View>
                                            </View>

                                            <All_Review
                                                locationname={locationame}
                                            />
                                        </View>



                                    ) :
                                        <View >


                                            <View style={styles.maincard}>
                                                <Entypo name="location" size={height / 10} color={Colorf.c} />
                                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={{ fontSize: height / 22, color: Colorf.c }}>{locationame}</Text>
                                                    <AirbnbRating
                                                        count={5}
                                                        defaultRating={star}
                                                        size={height / 25}
                                                        starImage={require('../img/ratt.jpg')}
                                                        selectedColor="orange"
                                                        showRating={false}
                                                        isDisabled={true}
                                                    />

                                                </View>
                                            </View>
                                            <View style={styles.card}>
                                                <Text style={{ fontSize: height / 35, color: Colorf.c, fontWeight: "500" }}>Distance {routedistance.dist} meter</Text>
                                                <Text style={{ fontSize: height / 35, color: Colorf.c, fontWeight: "500" }}>Duration {routedistance.duration} minutes</Text>
                                            </View>

                                            <View style={styles.help_card}>
                                                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                    <AntDesign name="questioncircle" size={height / 25} color={Colorf.c} />
                                                    <Text style={{ fontSize: height / 30, color: Colorf.c, fontWeight: "400", marginVertical: '2%' }}>How To Go</Text>
                                                </View>
                                                <Text style={{ fontSize: height / 40, color: Colorf.c, fontWeight: "500" }}>{info} </Text>

                                            </View>

                                            <View style={{ flexDirection: "row", justifyContent: "center", }}>

                                                <Button
                                                    icon={() => <FontAwesome6 name="map-location-dot" size={height / 40} color={Colorf.c} />}
                                                    mode="outlined"
                                                    onPress={() => sentconfirm()}
                                                    style={styles.btn}
                                                    theme={{ roundness: 2 }}
                                                    contentStyle={{ flexDirection: "row-reverse" }}
                                                    labelStyle={{
                                                        fontSize: height / 40, // Adjust the font size as needed
                                                        fontWeight: 500, // Use 'bold' for bold text
                                                        color: Colorf.c,
                                                        fontFamily: Colorf.f,
                                                    }}
                                                >
                                                    Map
                                                </Button>

                                                <Button
                                                    icon={() => <AntDesign name="closecircle" size={height / 40} color={Colorf.c} />}
                                                    mode="outlined"
                                                    onPress={() => sentclose()}
                                                    style={styles.btn}
                                                    theme={{ roundness: 2 }}
                                                    contentStyle={{ flexDirection: "row-reverse" }}
                                                    labelStyle={{
                                                        fontSize: height / 40, // Adjust the font size as needed
                                                        fontWeight: 500, // Use 'bold' for bold text
                                                        color: Colorf.c,
                                                        fontFamily: Colorf.f,
                                                    }}
                                                >
                                                    CLose
                                                </Button>
                                            </View>
                                            <TouchableOpacity style={{
                                                alignItems: "center", justifyContent: "center", marginTop: height / 25
                                            }}
                                                onPress={() => Showrev()}
                                            >
                                                <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
                                                    <Text style={{
                                                        fontSize: height / 35, color: Colorf.c, fontWeight: "700",
                                                        marginHorizontal: '2%'
                                                    }}>See Other's Review.</Text>
                                                    <FontAwesome6 name="comments" size={height / 35} color={Colorf.c} />
                                                </View>

                                            </TouchableOpacity>
                                        </View>
                                }
                            </View>
                        </View>
                    ) : (<Text>wait</Text>)
                }
            </Modal>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    btn: {
        backgroundColor: "white",
        margin: '1.5%',
        width: height / 5,
        marginVertical: '2%',
    },
    help_card: {
        backgroundColor: "white",
        padding: '3%',
        marginVertical: '2%',
        height: height / 4,
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 15,
        marginLeft: '2%',
        marginRight: '2%',
        marginVertical: '2%',
    },
    card: {
        backgroundColor: "white",
        height: height / 8,
        justifyContent: "center",
        padding: 5,
        borderRadius: 15,
        marginLeft: '2%',
        marginRight: '2%',
        alignItems: "center",
        marginBottom: '2%'
    },
    maincard: {
        height: height / 4,
        backgroundColor: Colorf.b,
        alignItems: "center",
        borderRadius: 15,
        marginLeft: '2%',
        marginRight: '2%',
        padding: 5,
        marginVertical: '2%',
        justifyContent: "center"
    }
});
