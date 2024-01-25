import { CommonActions } from '@react-navigation/native';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataBase } from "../Constrains/GoogleApi";
import * as Keychain from "react-native-keychain";
import Spinner from 'react-native-loading-spinner-overlay';
import PhoneInput from "react-native-phone-number-input";
import { ALERT } from '../Constrains/ALERT';
import { Snackbar } from 'react-native-paper';
import { Colorf } from '../Constrains/COLOR';

const { height } = Dimensions.get("window");

export const Login = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    const Spacing = 0.2;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkfetch, setcheckfetch] = useState(true)
    const [alertact, setalertact] = useState({ msg: "", boll: false, icon: "", des: "" })
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!checkfetch) {
                setalertact({ msg: 'Error Fetch Location', bull: true, icon: "alert", des: "" })
            }
            else {
                console.log('Timeout completed after 2 seconds all is ok');
            }

        }, 20000);

        return () => clearTimeout(timeoutId);

    }, [checkfetch === false]);

    useEffect(() => {

        (async () => {
            try {

                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    

                    // Pass credentials to START screen and prevent going back
                    props.navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'BtabNev',
                                params: credentials.username,
                            },
                        ],
                    }));
                } else {
                    console.log("No credentials stored");
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        })();
    }, []);

    const handleLogin = async () => {
        const backendUrl = DataBase;
        if (email !== "" && password !== "") {
            try {
                setcheckfetch(false)
                const response = await axios.post(`${backendUrl}/login`, { email, password });

                // check data fetch or not
                if (response.data) {
                    setcheckfetch(true)
                }
                console.log(response.data);
                console.log("====>>  Happy Login <<======");
                Keychain.setGenericPassword(email, password);
                

                // Pass credentials to START screen and prevent going back
                /*  props.navigation.dispatch(CommonActions.navigate({
                     name: 'DrawNev',
                     params: email,
                 })); */
                props.navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'BtabNev',
                            params: email,
                        },
                    ],
                }));
            } catch (error) {
                console.log('Error logging in:', error);
                Alert.alert('Login Failed', 'Invalid email or password',
                    [{ title: 'OK', onPress: setIsLoggedIn(true) }]);
                setEmail("");
                setPassword("");
            }
        } else {
            console.log("EMAIL = ", email)
            Alert.alert('Blanked field', 'try again', [{ title: 'OK', onPress: setIsLoggedIn(true) }]);

        }
    };




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                {
                    isLoggedIn ? (
                        <View>

                            <View
                                style={{
                                    marginVertical: 20 * 3,
                                    marginLeft: '2%',
                                    marginRight: '2%',
                                    borderRadius: 15
                                }}
                            >
                                <TextInput placeholder="Email" style={{
                                    backgroundColor: "#E5E5E6",
                                    marginVertical: 3, borderRadius: 10
                                }}
                                    onChangeText={(text) => setEmail(text)}
                                />
                                <TextInput placeholder="Password" style={{
                                    backgroundColor: "#E5E5E6",
                                    marginVertical: 5, borderRadius: 10
                                }}
                                    onChangeText={(text) => setPassword(text)} />
                            </View>




                            <TouchableOpacity
                                onPress={() => {
                                    setIsLoggedIn(false);
                                    handleLogin();
                                }}
                                style={{
                                    backgroundColor: "#0029D0",
                                    padding: 15,
                                    marginVertical: 10 * 3,
                                    marginLeft: '2%',
                                    marginRight: '2%',
                                    borderRadius: 15,
                                    shadowColor: "green",
                                    shadowOffset: {
                                        width: 0,
                                        height: Spacing,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: Spacing,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontSize: 22,
                                        fontWeight: "bold"
                                    }}
                                >
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('REGIST')}
                                style={{
                                    padding: Spacing,
                                }}
                            >
                                <Text
                                    style={{

                                        color: "#616082",
                                        textAlign: "center",
                                        fontSize: 18,
                                    }}
                                >
                                    Create new account
                                </Text>
                            </TouchableOpacity>


                        </View>
                    ) : (
                        <View>
                            <ALERT
                                visible={alertact}
                                hidevisible={(val) => { setalertact({ msg: "", bull: val, icon: "", des: "" }) }}
                            />
                            <Spinner
                                visible={true}
                                textContent={'Loading...'}
                                textStyle={styles.spinnerText}
                            />
                        </View>
                    )
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})


