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
import { DataBase } from "../Constrains/GoogleApi";
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { Snackbar, TextInput, Button, } from 'react-native-paper';
import { Colorf } from '../Constrains/COLOR';
import PhoneInput from 'react-native-phone-number-input';
import { isValidUsername, isValidEmail } from '../Helperfuncton/Helperfun'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
const { height } = Dimensions.get("window");
import { saveUserData, getUserData } from '../Helperfuncton/Asstore'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export const Registration = (props) => {
  const [checklogin, setchecklogin] = useState(true)
  const [email, setEmail] = useState('')
  const [formattedValue, setFormattedValue] = useState("");
  const [uname, setuname] = useState("")

  ////



  const [verificationCode, setVerificationCode] = useState("");
  const phoneInput = useRef(null);
  const [getOtp, setgetOtp] = useState(0)
  
  const [erotilte, seterotitle] = useState("")
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);


  const characterLimit = 10;
  const characterCount = uname.length;
  const remainingCharacters = characterLimit - characterCount

  const handleTextChange = (text) => {
    if (text.length <= characterLimit) {
      setuname(text);
    }
  }

  const checkunique = async () => {
    try {
      const response = await axios.post(`${DataBase}/checkDuplicateKey`, { id: formattedValue });
      return response.data.isDuplicate;
    } catch (error) {
      console.log('Error checking duplicate key:', error);
      return 500;
    }
  };




  const sendVerificationRequest = async () => {
    try {
      setgetOtp(3)
      /* const response = await axios.post(`${DataBase}/sendVerification`, { phoneNumber: formattedValue });

      if (response.data.status === 'pending') {
        console.log("before ", response.data.status)
        setgetOtp(3)
        
      }  */
    } catch (error) {
      console.error('Error sending verification request:', error.message);
    }
  };

  const checkVerificationCode = async () => {
    try {
      setgetOtp(4)
      /* const response = await axios.post(`${DataBase}/checkVerification`, {
        phoneNumber: formattedValue,
        verificationCode: verificationCode,
      });

      if (response.data.status === 'approved') {
        setgetOtp(4)
        console.log("after ", response.data.status)
        Alert.alert('Success', 'OTP verified successfully');
      }  */
    } catch (error) {
      console.error('Error checking verification code:', error.message);
    }
  };
  const handleOtp = async () => {
    setchecklogin(false)
    const checkValid = phoneInput.current?.isValidNumber(formattedValue);
    console.log(formattedValue)


    if (checkValid) {

      if (formattedValue.length === 12) {
        const isDuplicate = await checkunique();

        if (!isDuplicate) {
          setchecklogin(true)
          console.log('unique');
          sendVerificationRequest()

          return;
        }

        if (isDuplicate) {
          setchecklogin(true)
          seterotitle("This number already registered, use different number")
          onToggleSnackBar()

          return;
        }
        if (isDuplicate === 500) {
          setchecklogin(true)
          seterotitle("something is wrong")
          onToggleSnackBar()

          return;
        }
      }
      else {
        setFormattedValue("")
        setchecklogin(true)
        seterotitle("Dont use country code")
        onToggleSnackBar()
      }
    }
    else {
      setchecklogin(true)
      setFormattedValue('')
      seterotitle("Number is Not Valid")
      onToggleSnackBar()

    }
  };

  const handleuname = () => {
    const isValiduname = isValidUsername(uname);
    if (isValiduname) {
      setgetOtp(2)
    }
    else {
      setuname('')
      seterotitle("Name is Not Valid")
      onToggleSnackBar()
    }
  }


  //////


  /* useEffect(() => {
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
  }; */
  const handleSignUp = () => {

    setchecklogin(false)
    const isEmailValid = isValidEmail(email);
    if (isEmailValid) {

      axios.post(`${DataBase}/register`, { email, formattedValue, uname })
        .then(response => {
          const insertedUser = response.data;
          console.log(insertedUser);
          console.log(insertedUser.user.Uid);

          if (insertedUser) {
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
                    id: insertedUser.user.Uid
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
      setgetOtp(4)
      seterotitle("Email is Not Valid")
      setEmail("");
      onToggleSnackBar()

    }

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colorf.b }}>
      {
        checklogin ? (
          <View >
            {
              getOtp > 0 ? (
                <View style={{ marginTop: height / 8 }}>
                  <MaterialCommunityIcons
                    name="debug-step-over"
                    size={height / 25}
                    color={Colorf.c}
                    style={{ textAlign: "center", }}
                  />
                  <Text style={styles.steptxt} >Step {getOtp} / 4 </Text>
                </View>
              ) : null
            }
            {
              getOtp === 0 ? (
                <View style={{ marginTop: height / 5 }}>
                  <AntDesign name="adduser" size={height / 10} color={Colorf.c}
                    style={{ textAlign: "center", margin: '5%' }} />

                  <Text style={{ textAlign: "center" }}>Registration Pannel</Text>
                  <Text style={{ textAlign: "center", fontSize: 30 }}>Create Your Account</Text>

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
                    onPress={() => props.navigation.navigate('LOGIN')}
                    style={{
                      marginTop: 50
                    }}
                  >
                    <Text
                      style={{
                        color: Colorf.d,
                        textAlign: "center",
                        fontSize: 18,
                      }}
                    >
                      Already have an account
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null
            }
            {
              getOtp === 1 ? (
                <View >

                  <View style={styles.txt_area}>

                    <TextInput
                      value={uname}
                      onChangeText={handleTextChange}
                      label="Enter your name"
                      style={styles.textinput}
                      activeUnderlineColor={Colorf.c}
                    />

                    <Text style={{ margin: '5%', color: Colorf.d }}>{`Remaining character: ${remainingCharacters}/${characterLimit}`}</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Button
                      icon={() => <MaterialIcons name="navigate-next" size={height / 30} color={Colorf.c} />}
                      mode="outlined"
                      onPress={() => handleuname()}
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
                <View style={{ justifyContent: "center", alignItems: "center", }}>
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
              ) : null
            }

            {
              getOtp == 3 ? (
                <View >
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
            {
              getOtp == 4 ? (
                <View>
                  <TextInput
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                    style={styles.textinput}
                    activeUnderlineColor={Colorf.c}
                  />
                  <View style={{ alignItems: "center" }}>
                    <Button
                      icon={() => <AntDesign name="checkcircle" size={height / 40} color={Colorf.c} />}
                      mode="outlined"
                      style={styles.btn}
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
                      Submit
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
        style={{ backgroundColor: Colorf.d }}
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


/* 
 onPress={ () =>{
                setchecklogin(false)
                handleSignUp()}}
*/