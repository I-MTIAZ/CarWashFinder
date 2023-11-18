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
import { COLOR } from "../Constrains/COLOR";
import axios from 'axios';

export const Login = (props) => {

    const Spacing = 0.2
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Make sure to add your backend URL here
        const backendUrl = 'http://192.168.68.103:300';
        email !=="" && password !== "" ? 
        (
            axios.post(`${backendUrl}/login`, { email, password })
            .then(response => {
                console.log(response.data);
                console.log("====>>  Happy Login <<======");
                // Handle success, e.g., navigate to the home screen
                //props.navigation.navigate('HOME');
                props.navigation.navigate('MAP')
            })
            .catch(error => {
                console.error('Error logging in:', error);
                // Handle error, e.g., show an alert
                Alert.alert('Login Failed', 'Invalid email or password');
            })

           

        ):Alert.alert("Blanked field")
    };

    return (
        <SafeAreaView>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})


