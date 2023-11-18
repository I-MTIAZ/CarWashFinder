import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import { COLOR } from '../Constrains/COLOR';
import CustomBtn from './CustomBtn';
import { LogBox } from 'react-native';
import axios from 'axios';
import { DESTINATION } from './Destination';


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


export const Start = (props) => {

  const [destlocation, setdestlocation] = useState({})

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get('http://192.168.68.103:300')
      .then((response) => {
        const informationdata = response.data.map((location) => {
          return {
            ids: location.id,
            latitudes: location.lat,
            longitudes: location.long,
            titles: location.title
          }
        })
        //console.log(informationdata)
        setdestlocation(informationdata)
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
  }, []);

  const onDone = () => {
    //console.log(destlocation);
    props.navigation.navigate('MAP',destlocation)
    
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLOR.Snow, padding: 20, height: '35%', justifyContent: "center" }}>
        <Text style={styles.text_h} >Are you ready</Text>
      </View>
      <View>
        <CustomBtn
          btnText="Start"
          btnStyle={{ backgroundColor: COLOR.SeaGreen }}
          onPress={onDone}
        />
      </View>    
    </View>
  );
}

const styles = StyleSheet.create({
  text_h: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold"

  },
  text_p: {
    fontSize: 20,
  }
})


