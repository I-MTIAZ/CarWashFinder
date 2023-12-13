import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid, Button } from 'react-native';
import { COLOR } from '../Constrains/COLOR';
import CustomBtn from './CustomBtn';
import { LogBox } from 'react-native';
import axios from 'axios';
import { DESTINATION } from './Destination';
import { Review } from './Review';
import { DataBase } from '../Constrains/GoogleApi';
import * as Keychain from "react-native-keychain";
import LottieView from 'lottie-react-native';
import {CommonActions} from '@react-navigation/native';
import {NETINFO} from './NETINFO'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);




export const Start = (props) => {
  const [destlocation, setdestlocation] = useState({});

  const fetchData = () => {
    // Fetch data when the component mounts
    axios
      .get(DataBase)
      .then((response) => {
        const informationdata = response.data.map((location) => {
          return {
            ids: location.id,
            latitudes: location.lat,
            longitudes: location.long,
            titles: location.title,
            review: location.review
          }
        });
        setdestlocation(informationdata);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
        if (error.response) {
          console.error('Response data in error:', error.response.data);
        } else if (error.request) {
          console.error('Request data in error:', error.request);
        } else {
          console.error('Other error:', error.message);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const onNetworkChange = () => {
    // Call the fetchData function when the network is connected
    fetchData();
  };

  const onDone = () => {
    props.navigation.navigate('MAP', { destlocation: destlocation, data: props.route.params });
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

  const Allreview = () => {
    props.navigation.navigate('REV');
  };

  return (
    <View style={{ flex: 1 }}>
      <NETINFO onNetworkChange={onNetworkChange} />
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
