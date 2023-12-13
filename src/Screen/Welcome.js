import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { COLOR } from "../Constrains/COLOR";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NETINFO } from "./NETINFO"


const { height } = Dimensions.get("window");



export const Welcome = (props) => {
    return (
        <SafeAreaView>
            <View>
                <ImageBackground
                    style={{
                        height: height / 2.5,
                    }}
                    resizeMode="contain"
                    source={require("../img/car_park_cover.jpg")}
                />
                <View
                    style={{

                    }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                            padding: 30,
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "blue",
                        }}
                    >
                        Discover Your Dream Parking here
                    </Text>

                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 15,
                            fontWeight: "500",
                            marginBottom: height / 15

                        }}
                    >
                        Explore all the existing job roles based or your interest and study
                        major
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        padding: 18
                    }}
                >
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('LOGIN')}
                        style={{

                            height: height / 12,
                            width: "48%",
                            backgroundColor: COLOR.Deep_Sea,
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
                                color: "black"

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

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({})


