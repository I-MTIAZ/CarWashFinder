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
import {CommonActions} from '@react-navigation/native';




export const Registration = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setcPassword] = useState('')

  const handleSignUp = () => {
    console.log(email)
    console.log(password)
    console.log(cpassword)

    
    
    password === cpassword && password!== "" && cpassword !== "" && email !== "" ?
      (fetch(`${DataBase}/register`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          Keychain.setGenericPassword(email, password);
          // Pass credentials to START screen and prevent going back
          props.navigation.dispatch(CommonActions.navigate({
            name: 'START',
            params: email,
        }));
          // Handle success or error response from the backend
        })
        .catch(error => {
          console.error('Error sending registration data:', error);
          // Handle error
        })
     ): Alert.alert(" Password Not Match")
     setEmail("")
     setPassword("")
     setcPassword("")
  }

return (
  <SafeAreaView>
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
        onPress={handleSignUp}
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
  </SafeAreaView>
);
}

const styles = StyleSheet.create({})


