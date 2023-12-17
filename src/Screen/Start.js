import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid, Button, Alert } from 'react-native';
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



LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);




export const Start = (props) => {
  const [destlocation, setdestlocation] = useState({});
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
    console.log("from start", props.route.params)
  }, []); // Fetch data when the component mounts



  const onDone = () => {
    destlocation.length > 0
      ? props.navigation.navigate('MAP', { destlocation, data: props.route.params })
      : Alert.alert(
        'Data Not Fetched',
        'Location data has not been fetched yet. Check your internet connection and try again.',
        [{ text: 'OK', onPress: fetchData }]
      );
  };


  const [act, setact] = useState(false);

  const reviewgo = () => {
    setact(true);
  };

  const modal_close_btn = (val) => {
    setact(val);
  };

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
        Alert.alert('Error:', error);
        //Alert.alert('Error', 'Something went wrong');
      });

  }

  const Allreview = () => {
    props.navigation.navigate('REV');
  };

  return (
    <View style={{ flex: 1 }}>
      <NETINFO />
      <View>
        <CustomBtn
          btnText="Start"
          btnStyle={{ backgroundColor: COLOR.SeaGreen }}
          onPress={onDone}
        />
      </View>
      <Button title='press' onPress={reviewgo} />
      <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 15 }}>
        {/* Your Review component */}
      </View>
      <Button title='see all review' onPress={Allreview} />
      <Button title='logout' onPress={handleLogout} />
      <Button title='Delete Account' onPress={handleDeleteaccount} />
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
  }
});
