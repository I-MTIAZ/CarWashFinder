import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import React, { useEffect, useState, useRef } from 'react';
import * as Keychain from "react-native-keychain";
import { DataBase } from "../Constrains/GoogleApi";
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { Snackbar, TextInput, Button } from 'react-native-paper';
import { Colorf } from '../Constrains/COLOR';
import PhoneInput from 'react-native-phone-number-input';
import { isValidEmail } from '../Helperfuncton/Helperfun'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
const { height } = Dimensions.get("window");
import { saveUserData, getUserData } from '../Helperfuncton/Asstore'

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const Login = (props) => {
    const [checklogin, setchecklogin] = useState(false)
    const [email, setEmail] = useState('')
    const [formattedValue, setFormattedValue] = useState("");
    const [uname, setuname] = useState("")

    ////



    const [verificationCode, setVerificationCode] = useState("");
    const phoneInput = useRef(null);
    const [getOtp, setgetOtp] = useState(0)
    const [visible, setVisible] = useState(false);
    const [userData, setuserData] = useState(null);
    const [erotilte, seterotitle] = useState("")

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const handlelogin = async () => {
        try {
            const response = await axios.post(`${DataBase}/login`, { id: formattedValue });
            const { isDuplicate, fullRow } = response.data;

            if (isDuplicate) {
                // Save the fullRow data to your frontend state
                // For example, using React hooks:
                setuserData(fullRow);
            }

            return isDuplicate;
        } catch (error) {
            console.error('Error checking duplicate key:', error);
            return null;
        }
    };





    const sendVerificationRequest = async () => {
        try {
            setgetOtp(2)
            /* const response = await axios.post(`${DataBase}/sendVerification`, { phoneNumber: formattedValue });
      
            if (response.data.status === 'pending') {
              console.log("before ", response.data.status)
              setgetOtp(2)
              
            }  */
        } catch (error) {
            console.error('Error sending verification request:', error.message);
        }
    };

    const checkVerificationCode = async () => {
        try {
            Alert.alert("welcome")
            saveUserData(userData.email, formattedValue, userData.comment);
            props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'BtabNev',
                        params: {
                            email: userData.email,
                            number: formattedValue,
                            name: userData.comment,
                        },
                    },
                ],
            }));
            /* const response = await axios.post(`${DataBase}/checkVerification`, {
              phoneNumber: formattedValue,
              verificationCode: verificationCode,
            });
      
            if (response.data.status === 'approved') {
              
              console.log("after ", response.data.status)
              Alert.alert('Success', 'OTP verified successfully');
            }  */
        } catch (error) {
            console.error('Error checking verification code:', error.message);
        }
    };
    const handleOtp = async () => {
        const checkValid = phoneInput.current?.isValidNumber(formattedValue);

        setchecklogin(false)
        if (checkValid) {

            const isDuplicate = await handlelogin();

            if (!isDuplicate) {
                setchecklogin(true)
                seterotitle('unique/ this number is n0t registered');
                onToggleSnackBar()
                setFormattedValue("")
                return;

            }

            if (isDuplicate) {
                setchecklogin(true)
                sendVerificationRequest()
                seterotitle("This number  registered, ok")
                onToggleSnackBar()
                return;
            }

        }
        else {
            setchecklogin(true)
            setFormattedValue('')
            seterotitle("Number is Not Valid")
            onToggleSnackBar()
        }
    };


    //////


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
            setchecklogin(false)
        } else {
            console.log('User data not found.');
            setchecklogin(true)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                checklogin ? (
                    <View >
                        {
                            getOtp === 0 ? (
                                <View style={{ marginTop: height / 5 }}>
                                    <AntDesign name="login" size={height / 10} color={Colorf.c}
                                        style={{ textAlign: "center", margin: '5%' }} />

                                    <Text style={{ textAlign: "center" }}>Login Pannel</Text>
                                    <Text style={{ textAlign: "center", fontSize: 30 }}>Get Started Now!</Text>

                                    <View style={{ alignItems: "center" }}>
                                        <Button
                                            icon={() => <MaterialIcons name="navigate-next" size={height / 30} color={Colorf.c} />}
                                            mode="outlined"
                                            onPress={() => setgetOtp(1)}
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
                                            Next
                                        </Button>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => props.navigation.navigate('REGIST')}
                                    >
                                        <Text
                                            style={{

                                                marginTop: '5%',
                                                textAlign: "center",
                                                fontSize: 18,
                                            }}
                                        >
                                            Create new account
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null
                        }

                        {
                            getOtp == 1 ? (
                                <View style={{ justifyContent: "center", alignItems: "center", marginTop: height / 8 }}>
                                    <MaterialIcons name="phone-iphone" size={height / 10} color={Colorf.c} style={{ margin: '15%' }} />
                                    <PhoneInput
                                        ref={phoneInput}
                                        defaultValue={formattedValue}
                                        defaultCode="US"
                                        layout="first"
                                        onChangeFormattedText={(text) => setFormattedValue(text)}
                                        withDarkTheme
                                        withShadow
                                        autoFocus
                                    />
                                    <View style={{ alignItems: "center" }}>
                                        <Button
                                            icon={() => <MaterialIcons name="navigate-next" size={height / 30} color={Colorf.c} />}
                                            mode="outlined"
                                            onPress={handleOtp}
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
                                            Next
                                        </Button>
                                    </View>
                                </View>
                            ) : null
                        }

                        {
                            getOtp == 2 ? (
                                <View style={{ marginTop: height / 8 }} >
                                    <MaterialIcons name="perm-device-information" size={height / 10} color={Colorf.c}
                                        style={{ margin: '15%', textAlign: "center" }} />

                                    <TextInput
                                        placeholder="Enter OTP"
                                        value={verificationCode}
                                        onChangeText={(text) => setVerificationCode(text)}
                                        keyboardType="numeric"
                                        style={styles.textinput}
                                        activeUnderlineColor={Colorf.c}
                                    />
                                    <View style={{ alignItems: "center" }}>
                                        <Button
                                            icon={() => <MaterialIcons name="navigate-next" size={height / 30} color={Colorf.c} />}
                                            mode="outlined"
                                            onPress={checkVerificationCode}
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
                                            Next
                                        </Button>
                                    </View>
                                </View>
                            ) : null
                        }

                    </View>
                ) : (
                    <Spinner
                        visible={true}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerText}
                    />
                )
            }
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={2000}
                style={{  backgroundColor: Colorf.d }}
            >
                {erotilte}
            </Snackbar>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    txt_area: {
        height: height / 5,
        backgroundColor: "white",
        borderRadius: 25,
        marginLeft: '3%',
        marginRight: '3%',
    },
    textinput: {
        marginLeft: '2%',
        marginRight: '2%',
        fontWeight: "700",
        marginTop: '3%',
        maxHeight: 85,
        backgroundColor: "white",
    },
    btn: {
        backgroundColor: "white",
        marginTop: '5%',
        width: height / 3,
    },

    steptxt: {
        fontSize: 20,
        fontWeight: "500",
        color: Colorf.c,
        textAlign: "center",
        marginBottom: '5%'
    },

})


