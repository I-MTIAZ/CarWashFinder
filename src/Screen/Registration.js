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
import * as Keychain from "react-native-keychain";
import { DataBase } from "../Constrains/GoogleApi";
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';


export const Registration = (props) => {
  const [checklogin, setchecklogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setcPassword] = useState('')
  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          // Pass credentials to START screen and prevent going back
          Alert.alert(
            'You Already log in to your Account',
            'Please Log Out to registration',
            [{ text: 'OK'}])
          props.navigation.navigate('LOGIN')
        } else {
          console.log("No credentials stored");
          setchecklogin(true)
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })()
  }, []);

  const handleSignUp = () => {
    console.log(email);
    console.log(password);
    console.log(cpassword);

    if (password === cpassword && password !== "" && cpassword !== "" && email !== "") {
      axios.post(`${DataBase}/register`, { email, password })
        .then(response => {
          const data = response.data;
          console.log(data);

          if (data.success) {
            // Registration successful
            Keychain.setGenericPassword(email, password);
            // Pass credentials to START screen and prevent going back
            /* props.navigation.dispatch(CommonActions.navigate({
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
          }
        })
        .catch(error => {
          console.log('Error sending registration data:', error);
          // Handle error
          //checklogin(true)
          
        })
        .finally(() => {
          // Reset form fields
          Alert.alert('Email already exists. Please use a different email.','try again'
          [{title: 'OK',onPress:setchecklogin(true)}]);
          setEmail("");
          setPassword("");
          setcPassword("");
        });
    } else {
      Alert.alert('Something is Wrong',
      'password not matched or field is empty',
      [{title: 'OK',onPress:setchecklogin(true)}]
      );
      // Reset form fields
      setEmail("");
      setPassword("");
      setcPassword("");
    }
  };

  return (
    <SafeAreaView>
      {
        checklogin ? (
          <View
            style={{
              padding: 20,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 35,
                  color: "red",
                  marginVertical: 25,
                }}
              >
                Create account
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  maxWidth: "80%",
                  textAlign: "center",
                }}
              >
                Create an account so you can explore all the existing jobs
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
              }}
            >
              <TextInput
                placeholder="Email"
                value={email} // Set the value of the TextInput to the 'email' state variable
                onChangeText={(text) => setEmail(text)} // Update the 'email' state variable on change
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TextInput
                placeholder="Confirm Password"
                value={cpassword}
                onChangeText={(text) => setcPassword(text)}
              />

            </View>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "orange",
                marginVertical: 10,
                borderRadius: 15,
                shadowColor: "black",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 25,

              }}
              onPress={ () =>{
                setchecklogin(false)
                handleSignUp()}}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: 45,
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('LOGIN')}
              style={{
                padding: 25,
              }}
            >
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                Already have an account
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})


