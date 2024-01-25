import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import { DataBase } from '../Constrains/GoogleApi';
import { Snackbar } from 'react-native-paper';
import { Colorf } from '../Constrains/COLOR';

export const Verify = () => {
  
  const [formattedValue, setFormattedValue] = useState("");
  
  const [verificationCode, setVerificationCode] = useState("");
  const phoneInput = useRef(null);
  const [getOtp, setgetOtp] = useState(false)
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const sendVerificationRequest = async () => {
    try {
      setgetOtp(true)
      /* const response = await axios.post(`${DataBase}/sendVerification`, { phoneNumber: formattedValue });

      if (response.data.status === 'pending') {
        console.log("before ", response.data.status)
        setgetOtp(true)
        
      }  */
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
        console.log("after ", response.data.status)
        Alert.alert('Success', 'OTP verified successfully');
      } else {
        Alert.alert('Error', 'Invalid OTP');
        
      }
    } catch (error) {
      console.error('Error checking verification code:', error.message);
    }
  };
  const handleOtp = () => {
    const checkValid = phoneInput.current?.isValidNumber(formattedValue);

    if (checkValid) {
      // Your logic for handling OTP goes here
      // For example, you can navigate to the OTP screen or trigger an OTP generation process
      
      sendVerificationRequest()
    } else {
      // Handle invalid input, you can show a message or take appropriate action
      
      onToggleSnackBar()
      setFormattedValue('')
      
    }
  };
  console.log(getOtp)

  return (
    <View style={{}}>
      <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
        

        {
          !getOtp ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
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
              <TouchableOpacity
                style={{ height: 50, width: 200, backgroundColor: "#7141A0", justifyContent: "center", marginVertical: '5%' }}
                onPress={handleOtp}
              >
                <View>
                  <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "800" }}>Check</Text>
                </View>

              </TouchableOpacity>
            </View>
          ) : null
        }

        {
          getOtp ? (
            <View>
              <TextInput
                placeholder="Enter OTP"
                value={verificationCode}
                onChangeText={(text) => setVerificationCode(text)}
                keyboardType="numeric"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: '5%' }}
              />

              <TouchableOpacity
                style={{ height: 50, width: 200, backgroundColor: "#7141A0", justifyContent: "center", marginVertical: '5%' }}
                onPress={checkVerificationCode}
              >
                <View>
                  <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "800" }}>Check</Text>
                </View>

              </TouchableOpacity>
            </View>
          ) : null
        }
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={2000}
          style={{ alignItems: "center", justifyContent: "center", backgroundColor: Colorf.d, position: "absolute", bottom: -150, }}
        >
          Number is Incorrect
        </Snackbar>
      </SafeAreaView>
    </View>
  );
};


