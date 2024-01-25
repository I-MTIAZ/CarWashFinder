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
import { isValidUsername, isValidEmail } from '../Helperfuncton/Helperfun'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
const { height } = Dimensions.get("window");
import { saveUserData, getUserData } from '../Helperfuncton/Asstore'

export const Registration = (props) => {
  const [checklogin, setchecklogin] = useState(false)
  const [email, setEmail] = useState('')
  const [formattedValue, setFormattedValue] = useState("");
  const [uname, setuname] = useState("")

  ////



  const [verificationCode, setVerificationCode] = useState("");
  const phoneInput = useRef(null);
  const [getOtp, setgetOtp] = useState(1)
  const [visible, setVisible] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [erotilte, seterotitle] = useState("")

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const checkunique = async () => {
    try {
      const response = await axios.post(`${DataBase}/checkDuplicateKey`, { id: formattedValue });
      return response.data.isDuplicate;
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
      setgetOtp(3)
      /* const response = await axios.post(`${DataBase}/checkVerification`, {
        phoneNumber: formattedValue,
        verificationCode: verificationCode,
      });

      if (response.data.status === 'approved') {
        setgetOtp(3)
        console.log("after ", response.data.status)
        Alert.alert('Success', 'OTP verified successfully');
      }  */
    } catch (error) {
      console.error('Error checking verification code:', error.message);
    }
  };
  const handleOtp = async () => {
    const checkValid = phoneInput.current?.isValidNumber(formattedValue);
    const isValiduname = isValidUsername(uname);

    if (checkValid && isValiduname) {

      const isDuplicate = await checkunique();

      if (!isDuplicate) {
        console.log('unique');
        sendVerificationRequest()
        return;
      }

      if (isDuplicate) {
        
        seterotitle("This number already registered, use different number")
        onToggleSnackBar()
        return;
      }


    }
    else if (!checkValid && !isValiduname) {
      setuname('')
      setFormattedValue('')
      seterotitle("Name & Number is Not Valid")
      onToggleSnackBar()
    }
    else if (!isValiduname) {
      // Handle invalid input, you can show a message or take appropriate action
      setuname('')
      seterotitle("Name is Not Valid")
      onToggleSnackBar()
    }
    else if (!checkValid) {
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
  const handleSignUp = () => {
    setchecklogin(false)
    const isEmailValid = isValidEmail(email);
    if (isEmailValid) {

      axios.post(`${DataBase}/register`, { email, formattedValue, uname })
        .then(response => {
          const data = response.data;
          console.log(data);

          if (data.success) {
            // Registration successful
            saveUserData(email, formattedValue, uname);
            props.navigation.dispatch(CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'BtabNev',
                  params: {
                    email: email,
                    number: formattedValue,
                    name: uname,
                  },
                },
              ],
            }));
          }
          else {
            // Registration failed, handle the error
            console.error('Registration failed:', data.error);
            // Handle the error in your UI, e.g., show an alert or update state
          }
        })
        .catch(error => {
          console.log("problem", error);
        })
        .finally(() => {
          // Reset form fields
          setEmail("");
          setuname("");
          setFormattedValue("")
        });

    } else {
      setchecklogin(true)
      setgetOtp(3)
      seterotitle("Email is Not Valid")
      setEmail("");
      onToggleSnackBar()

    }
  };

  return (
    <SafeAreaView>
      {
        checklogin ? (
          <View >

            {
              getOtp == 1 ? (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <TextInput
                    value={uname}
                    placeholder="Type here..."
                    onChangeText={txt => setuname(txt)}
                    activeUnderlineColor={Colorf.c}
                    multiline={true}
                    numberOfLines={2}
                  />

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
                      <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "800" }}>Ok</Text>
                    </View>

                  </TouchableOpacity>
                </View>
              ) : null
            }

            {
              getOtp == 2 ? (
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
            {
              getOtp == 3 ? (
                <View>
                  <TextInput
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: '5%' }}
                  />

                  <Button
                    icon={() => <FontAwesome6 name="map-location-dot" size={height / 40} color={Colorf.c} />}
                    mode="outlined"
                    onPress={() => {
                      handleSignUp()
                    }}
                    /* style={styles.btn} */
                    theme={{ roundness: 2 }}
                    contentStyle={{ flexDirection: "row-reverse" }}
                    labelStyle={{
                      fontSize: height / 40, // Adjust the font size as needed
                      fontWeight: 500, // Use 'bold' for bold text
                      color: Colorf.c,
                      fontFamily: Colorf.f,
                    }}
                  >
                    Map
                  </Button>
                </View>
              ) : null
            }
            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              duration={2000}
              style={{ alignItems: "center", justifyContent: "center", backgroundColor: Colorf.d, position: "absolute", bottom: -150, }}
            >
              {erotilte}
            </Snackbar>



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


/* 
 onPress={ () =>{
                setchecklogin(false)
                handleSignUp()}}
*/