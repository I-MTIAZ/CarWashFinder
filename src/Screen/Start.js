import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Dimensions, SafeAreaView, Platform } from 'react-native';

import { LogBox } from 'react-native';
import axios from 'axios';


import { DataBase } from '../Constrains/GoogleApi';
import { NETINFO } from "./NETINFO"
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, TextInput } from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'  //package
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' // cash-plus  qrcode-scan



const { height } = Dimensions.get("window");

const btncolor = "#00674b"
const Fontsize = height/40
const Fontweight = 'bold'
const Fontfamily = ""
const MODE = "outlined"
const logosize = height/25


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



  //previous react native MAP
  /* const onDone = () => {
    props.navigation.navigate('MAP', { destlocation, data: props.route.params });
  }; */

  // Connect With Google MAP
  const onDone = () => {
    props.navigation.navigate('GMAPTwo', { destlocation, data: props.route.params });
  };

  useEffect(() => {
    setTimeout(() => {
      if (destlocation.length <= 0) {
        Alert.alert(
          'Data Not Fetched, Location data has not been fetched yet.',
          'wait for loading if takes too much time restart the process, it will handled in design process',
          [{ text: 'OK', onPress: fetchData }])

      }
    }, 5000); // Adjust the timeout duration as needed (in milliseconds)
  }, []);






  const handlenewplace = () => {
    props.navigation.navigate('NPLACE')
  }
  const handleqrcode = () => {
    props.navigation.navigate('QRSCAN')
  }

  const handlerecharge = () => {
    props.navigation.navigate('GETRECHARGE')
  }
  const handlebuypackage = () => {
    props.navigation.navigate('BUYPACKAGE')
  }




  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 0 : 0 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <NETINFO />
        <View style={{ margin: height / 45 }}>
          

          <Button
            mode={MODE}
            style={styles.btn}
            onPress={onDone}
            contentStyle={{ flexDirection: 'row', alignItems: 'center', marginLeft: '10%', justifyContent: 'flex-start', padding: 0, }}
            labelStyle={{
              fontSize: Fontsize, // Adjust the font size as needed
              fontWeight: Fontweight, // Use 'bold' for bold text
              color: btncolor,
              fontFamily: Fontfamily,
              margin:0,
              padding:0
            }}
            icon={({ size, color }) => (
              <Feather name="map" size={logosize} color={btncolor} />
            )}
            
            loading={isloading}
            disabled={isloading}
            theme={{ roundness: 3 }} 
          >
            Go to Map
          </Button>

          <TouchableOpacity onPress={handlenewplace} style={styles.btntou}>
          <MaterialIcons name="add-location-alt" size={logosize} color={btncolor} />
            <View style={{ marginLeft: '2%' }}>
              <Text style={styles.btn_txt}>Add New Parking</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleqrcode} style={styles.btntou}>
          <MaterialCommunityIcons name="qrcode-scan" size={logosize} color={btncolor} />
            <View style={{ marginLeft: '2%' }}>
              <Text style={styles.btn_txt}>QrCode Scanner</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlerecharge} style={styles.btntou}>
          <MaterialCommunityIcons name="cash-plus" size={logosize} color={btncolor} />
            <View style={{ marginLeft: '2%' }}>
              <Text style={styles.btn_txt}>Get Recharge</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlebuypackage} style={styles.btntou}>
          <Fontisto name="shopping-package" size={logosize} color={btncolor} />
            <View style={{ marginLeft: '2%' }}>
              <Text style={styles.btn_txt}> Buy Package</Text>
            </View>
          </TouchableOpacity>

        </View>


      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  btn: {
    marginVertical: height/45,
    height: height / 11,
    justifyContent: "center",
  },
  btntou: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 11,
    borderRadius:15,
    borderColor:'black',
    borderWidth:0.5,
    //justifyContent:"center",
    marginVertical: height/45,
    paddingLeft:height/15
},
btn_txt:{
  color:btncolor,
  fontSize:Fontsize,
  fontWeight: Fontweight,
  fontFamily:Fontfamily
}
});

