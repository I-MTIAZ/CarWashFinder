import { CommonActions } from '@react-navigation/native';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataBase } from "../Constrains/GoogleApi";
import * as Keychain from "react-native-keychain";
import Spinner from 'react-native-loading-spinner-overlay';

export const Login = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const Spacing = 0.2;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    setIsLoggedIn(true);
                    setUserDetails(credentials);

                    // Pass credentials to START screen and prevent going back
                    props.navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'DrawNev',
                                params: credentials.username,
                            },
                        ],
                    }));
                } else {
                    console.log("No credentials stored");
                    setIsLoggedIn("");
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
                const response = await axios.post(`${backendUrl}/login`, { email, password });
                console.log(response.data);
                console.log("====>>  Happy Login <<======");
                Keychain.setGenericPassword(email, password);
                setIsLoggedIn(true);
                setUserDetails({ email, password });

                // Pass credentials to START screen and prevent going back
                props.navigation.dispatch(CommonActions.navigate({
                    name: 'DrawNev',
                    params: email,
                }));
            } catch (error) {
                Alert.alert('Error logging in:', error);
                Alert.alert('Login Failed', 'Invalid email or password');
                setEmail("")
                setPassword("")
            }
        } else {
            Alert.alert("Blanked field");
            setEmail("")
            setPassword("")
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                {
                    isLoggedIn == "" ? (
                        <View
                            style={{
                                padding: Spacing * 2,
                            }}
                        >
                            <View
                                style={{
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 50,
                                        color: "blue",
                                        marginVertical: 20 * 2,
                                        fontWeight: "600"
                                    }}
                                >
                                    Login here
                                </Text>
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: 20,
                                        maxWidth: "60%",
                                        textAlign: "center",
                                    }}
                                >
                                    Welcome back you've been missed!
                                </Text>
                            </View>
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
                                    onChangeText={(text) => setEmail(text)} />
                                <TextInput placeholder="Password" style={{
                                    backgroundColor: "#E5E5E6",
                                    marginVertical: 5, borderRadius: 10
                                }}
                                    onChangeText={(text) => setPassword(text)} />
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: "red",
                                        textAlign: "center"
                                    }}
                                >
                                    Forgot your password ?
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={handleLogin}
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
                        <Spinner
                            visible={true}
                            textContent={'Loading...'}
                            textStyle={styles.spinnerText}
                        />
                    )
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})


