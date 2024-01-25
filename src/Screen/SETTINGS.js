import React from 'react';
import { View, StyleSheet, Alert, Platform, Dimensions, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-paper';
import * as Keychain from "react-native-keychain";
import { CommonActions } from '@react-navigation/native';
import { DataBase } from '../Constrains/GoogleApi';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign' //profile // infocirlceo
import Entypo from 'react-native-vector-icons/Entypo' // log-out
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' //account-cancel // cash-plus

import AsyncStorage from '@react-native-async-storage/async-storage';



import axios from 'axios';
const { height } = Dimensions.get("window");
const logoheight = height / 30

export const SETTINGS = (props) => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


    const handleLogout = async () => {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('number');
        await AsyncStorage.removeItem('name');
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'WELCOME',
                    },
                ],
            })
        );
    };
    const handleDeleteaccount = () => {
        Alert.alert(
            'Are you sure deleteing Acoount', '',

            [{ text: 'YES', onPress: Delete_Act }, { text: 'NO' }]

        );
    }

    const Delete_Act = () => {
        const email = props.route.params; // Replace with the actual email

        axios
            .delete(`${DataBase}/deleteAccount/${email}`)
            .then((response) => {
                if (response.status === 200) {
                    Alert.alert('Success', 'Account deleted successfully');
                    handleLogout()
                } else {
                    Alert.alert('Error', 'Something went wrong');
                }
            })
            .catch((error) => {
                console.log('Error:', error);
                Alert.alert('Error', 'Something went wrong');
            });

    }

    const handleprofile = () => {
        props.navigation.navigate("PROFILE", props.route.params)
    }
    const handleAppinfo = () => {

    }
    const handlegetrecharge = () => {

    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '2%' : 0 }}>
            <View style={{ flex: 1 }}>

                <View style={{ alignItems: "center", marginTop: '8%' }}>
                    <FontAwesome name="user-circle-o" color='#00674b'
                        size={height / 6} />
                    <Text style={{ marginTop: '6%' }}>{props.route.params.number}</Text>
                </View>

                <View style={{ marginTop: height / 20, marginBottom: height / 20 }}>


                    <TouchableOpacity onPress={handleprofile} style={styles.btn}>
                        <AntDesign name="profile" color='#00674b' size={logoheight} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.btn_txt}>Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={styles.btn}>
                        <Entypo name="log-out" color='#00674b' size={logoheight} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.btn_txt}>Logout</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={handleDeleteaccount} style={styles.btn}>
                        <MaterialCommunityIcons name="account-cancel" color='#00674b' size={logoheight} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.btn_txt}>Delete Account</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleAppinfo} style={styles.btn}>
                        <AntDesign name="infocirlceo" color='#00674b' size={logoheight} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.btn_txt}>App Info</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlegetrecharge} style={styles.btn}>
                        <MaterialCommunityIcons name="cash-plus" color='#00674b' size={logoheight} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.btn_txt}>Get Recharge</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={styles.btn}>
                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                    </View>

                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height / 12,
        backgroundColor: 'white',
        paddingLeft: height / 30
    },
    btn_txt: {
        color: "#00674b",
        fontWeight: "bold"
    }
})


