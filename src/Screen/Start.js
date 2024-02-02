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
import { Colorf } from '../Constrains/COLOR';
import * as Progress from 'react-native-progress';


const { height } = Dimensions.get("window");

const btncolor = "#00674b"
const Fontsize = height / 40
const Fontweight = 'bold'
const Fontfamily = ""
const MODE = "outlined"
const logosize = height / 25


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);




export const Start = (props) => {

  const [progress, setProgress] = useState();
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


  useEffect(() => {
    setProgress(0.5);
  }, []);



  const handlenewplace = () => {
    props.navigation.navigate('NPLACE')
  }
  const handleqrcode = () => {
    props.navigation.navigate('QRSCAN', props.route.params)
  }

  const handlerecharge = () => {
    props.navigation.navigate('GETRECHARGE')
  }
  const handlebuypackage = () => {
    props.navigation.navigate('BUYPACKAGE')
  }

  const formatText = (progress) => {
    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MaterialCommunityIcons
        name="trophy"
        size={height / 20}
        color={Colorf.c1}
      />
      <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: height / 35, color: Colorf.c1 }}>{Math.round(progress * 100)}%</Text>
    </View>
  };
  const d = 50


  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 0 : 0 }}>
      <View style={{ flex: 1, }}>
        <NETINFO />
        <View style={{ marginBottom: height / 10, }}>

          <View style={{ justifyContent: "center", flexDirection: "row", marginBottom: '3%', backgroundColor:Colorf.c, width: '100%', height: height / 4.5, paddingTop: '5%' }}>

            <View style={{
              height: height / 5.8, width: height / 5.8, borderRadius: height / 2.9, borderWidth: 2.5,
              borderColor: Colorf.c1, alignItems: "center", justifyContent: "center",
              marginHorizontal: '5%'
            }}>
              <View style={{ flexDirection: "row", }}>
                <Text style={{ fontSize: height / 30, fontWeight: "bold", color: Colorf.c1 }}>50</Text>
                <MaterialCommunityIcons
                  name="currency-bdt"
                  size={height / 25}
                  color={Colorf.c1} />
              </View>
              <Text style={{ fontSize: height / 35, fontWeight: "500", color: Colorf.c1 }}>Balance</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", marginHorizontal: '5%' }}>
              <Progress.Circle progress={progress} size={height / 5.8}
                color={Colorf.c1} thickness={height / 150} borderWidth={2.5}
                formatText={formatText}
                showsText
                borderColor={Colorf.c1}
              />

            </View>
          </View>

          <View style={{marginLeft:'2%',marginRight:'2%'}}>
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
                margin: 0,
                padding: 0,


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


      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  btn: {
    marginVertical: height / 45,
    height: height / 13,
    justifyContent: "center",
    borderWidth: 1.8,
    borderColor: Colorf.c1,
    backgroundColor: "white"

  },
  btntou: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 13,
    borderRadius: 15,
    borderColor: Colorf.c1,
    borderWidth: 1.7,
    //justifyContent:"center",
    marginVertical: height / 45,
    paddingLeft: height / 15,
    backgroundColor: "white"

  },
  btn_txt: {
    color: btncolor,
    fontSize: Fontsize,
    fontWeight: Fontweight,
    fontFamily: Fontfamily
  }
});

