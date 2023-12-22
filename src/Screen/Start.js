import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid, Alert } from 'react-native';
import { COLOR } from '../Constrains/COLOR';
import CustomBtn from './CustomBtn';
import { LogBox } from 'react-native';
import axios from 'axios';
import { DESTINATION } from './Destination';
import { Review } from './Review';
import { DataBase } from '../Constrains/GoogleApi';
import * as Keychain from "react-native-keychain";
import { CommonActions } from '@react-navigation/native';
import { NETINFO } from "./NETINFO"
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, TextInput } from 'react-native-paper';




LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);




export const Start = (props) => {
  const [destlocation, setdestlocation] = useState({});
  //
  const [isloading, setislaoding] = useState(true)
  //console.log("from start")

  const fetchData = async () => {
    try {
      const response = await axios.get(DataBase);
      const informationdata = response.data.map((location) => {
        return {
          ids: location.id,
          latitudes: location.lat,
          longitudes: location.long,
          titles: location.title,
          review: location.review
        };
      });
      setdestlocation(informationdata);
      setislaoding(false)
    } catch (error) {
      console.log('Error fetching location data:', error);
      if (error.response) {
        console.log('Response data in error:', error.response.data);
      } else if (error.request) {
        console.log('Request data in error:', error.request);
      } else {
        console.log('Other error:', error.message);
      }

    }
  };

  useEffect(() => {
    fetchData();
    console.log("from start ", props.route.params)
  }, []); // Fetch data when the component mounts


  const [act, setact] = useState(true)
  const onDone = () => {
    props.navigation.navigate('MAP', { destlocation, data: props.route.params });
  };

  useEffect( () => {
    setTimeout(() => {
      if (destlocation.length <= 0) {
        Alert.alert(
          'Data Not Fetched, Location data has not been fetched yet.',
          'wait for loading if takes too much time restart the process, it will handled in design process',
          [{ text: 'OK', onPress: fetchData }])

      } 
    }, 5000); // Adjust the timeout duration as needed (in milliseconds)
  },[]);


  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({ logout });
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'WELCOME',
          },
        ],
      })
    );
  };

  const handleDeleteaccount = () => {
    Alert.alert(
      'Are you sure deleteing Acoount', '',

      [{ text: 'YES', onPress: Delete_Act }, { text: 'NO' }]

    );
  }

  const Delete_Act = () => {
    const email = props.route.params; // Replace with the actual email

    axios
      .delete(`${DataBase}/deleteAccount/${email}`)
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Success', 'Account deleted successfully');
          handleLogout()
        } else {
          Alert.alert('Error', 'Something went wrong');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        Alert.alert('Error', 'Something went wrong');
      });

  }

  const handlenewplace = () => {
    props.navigation.navigate('NPLACE')
  }



  return (
    <View style={{ flex: 1 }}>
      <NETINFO />
      {
        act ? (
          <View>
            <Button
              mode="contained"
              style={{ marginVertical: '4%', height: 60, justifyContent: "center"}}
              onPress={onDone}
              buttonColor='#068D87'
              labelStyle={{
                fontSize: 20, // Adjust the font size as needed
                fontWeight: 'bold', // Use 'bold' for bold text
              }}
              loading={isloading}
              disabled={isloading}
            >
              Go
            </Button>
            <Button
              mode="contained"
              style={{ marginVertical: '4%', height: 60, justifyContent: "center" }}
              onPress={handleLogout}
            >
              Logout
            </Button>
            <Button
              mode="contained"
              style={{ marginVertical: '4%', height: 60, justifyContent: "center" }}
              onPress={handleDeleteaccount}
            >
              Delete Account
            </Button>
            <Button
              mode="contained"
              style={{ marginVertical: '4%', height: 60, justifyContent: "center" }}
              onPress={handlenewplace}
            >
              Add New Parking
            </Button>
          </View>
        ) : (<View>
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={styles.spinnerText}
          />
        </View>)
      }
    </View>
  );
};


const styles = StyleSheet.create({
  text_h: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold"
  },
  text_p: {
    fontSize: 20,
  },
  gap: {
    marginVertical: 15
  }
});
