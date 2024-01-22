import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import { DataBase} from '../Constrains/GoogleApi';

export const Verify = () => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const phoneInput = useRef(null);

  const sendVerificationRequest = async () => {
    try {
      const response = await axios.post(`${DataBase}/sendVerification`, { phoneNumber: formattedValue });

      if (response.data.status === 'pending') {
        console.log("before ",response.data.status )
        setShowMessage(true);
      } else {
        setShowMessage(true);
      }
    } catch (error) {
      console.error('Error sending verification request:', error.message);
    }
  };

  const checkVerificationCode = async () => {
    try {
      const response = await axios.post(`${DataBase}/checkVerification`, {
        phoneNumber: formattedValue,
        verificationCode: verificationCode,
      });

      if (response.data.status === 'approved') {
        console.log("after ",response.data.status )
        Alert.alert('Success', 'OTP verified successfully');
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error checking verification code:', error.message);
    }
  };

  return (
    <View>
      <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
        {showMessage && (
          <View>
            <Text>Value : {value}</Text>
            <Text>Formatted Value : {formattedValue}</Text>
          </View>
        )}
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="CA"
          layout="first"
          onChangeText={(text) => setValue(text)}
          onChangeFormattedText={(text) => setFormattedValue(text)}
          withDarkTheme
          withShadow
          autoFocus
        />
        <TouchableOpacity
          style={{ height: 50, width: 200, backgroundColor: "#7141A0", justifyContent: "center", marginVertical: '5%' }}
          onPress={sendVerificationRequest}
        >
          <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "800" }}>Check</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Enter OTP"
          value={verificationCode}
          onChangeText={(text) => setVerificationCode(text)}
          keyboardType="numeric"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: '5%' }}
        />

        <TouchableOpacity
          style={{ height: 50, width: 200, backgroundColor: "#7141A0", justifyContent: "center" }}
          onPress={checkVerificationCode}
        >
          <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "800" }}>Verify OTP</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};


