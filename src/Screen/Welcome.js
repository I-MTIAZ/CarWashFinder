import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR } from "../Constrains/COLOR";
import { Colorf } from "../Constrains/COLOR";
import { NETINFO } from "./NETINFO";
import { saveUserData, getUserData } from '../Helperfuncton/Asstore'
import { CommonActions } from '@react-navigation/native';


const { height } = Dimensions.get("window");



export const Welcome = (props) => {

    const [authentication, setauthentication] = useState(false)

    useEffect(() => {
        // Fetch user data when the component mounts
        fetchData();
    }, []);
    const fetchData = async () => {
        // Call the getUserData function to retrieve user data
        const userData = await getUserData();

        if (userData) {
            console.log('User Data in ProfilePage:', userData);
            props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'BtabNev',
                        params: userData,
                    },
                ],
            }));

        } else {
            console.log('User data not found.');
            setauthentication(true)

        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {
                authentication ? (
                    <View>
                        <View style={{ height: height / 2 }}>
                            <ImageBackground
                                style={{
                                    height: height / 2.5,
                                }}
                                resizeMode="cover"
                                source={require("../img/car_park_cover.jpg")}
                            />
                        </View>
                        <View style={{
                            height: height / 2, backgroundColor: Colorf.b,
                            borderTopRightRadius: 80,
                            borderTopLeftRadius: 80,
                            width: "100%"
                        }}>
                            <View
                                style={{



                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: height / 25,
                                        padding: 30,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: Colorf.c,
                                    }}
                                >
                                    Welcome Your Dream Parking here
                                </Text>

                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 15,
                                        fontWeight: "500",
                                        marginBottom: height / 15,
                                        color: Colorf.c

                                    }}
                                >
                                    Explore all the existing job roles based or your interest and study
                                    major
                                </Text>

                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    padding: 18,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('LOGIN')}
                                    style={{

                                        height: height / 12,
                                        width: "48%",
                                        backgroundColor: Colorf.c,
                                        justifyContent: "center",
                                        borderRadius: 10,
                                        shadowOffset: {
                                            width: 0,
                                            backgroundColor: COLOR.Night

                                        },
                                        shadowOpacity: 0.3,

                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "500",
                                            textAlign: "center",
                                            color: COLOR.Snow
                                        }}
                                    >
                                        Login
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('REGIST')}
                                    style={{
                                        height: height / 12,
                                        width: "48%",
                                        justifyContent: "center",
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            color: Colorf.c,

                                        }}
                                    >
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: height / 12, }}>
                            <NETINFO />
                        </View>
                    </View>
                ):<View>
                    <Text>Loading</Text>
                </View>
            }


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({})


