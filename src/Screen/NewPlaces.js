import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Alert, Image, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { locationPermission, getCurrentLocation } from '../Helperfuncton/Helperfun';
import { Button, TextInput } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { AddressPickup } from './AddressPickup';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ALERT } from '../Constrains/ALERT';
import { DataBase } from '../Constrains/GoogleApi';
import axios from 'axios';


export const NewPlaces = (props) => {
  const navigation = useNavigation();
  const [location, setlocation] = useState({
    latitude: 0,
    longitude: 0
  })
  const [Pnumber, setPnumber] = useState("");
  const [Uname, setUname] = React.useState("");
  const[Placename,setPlacename]=useState("");
  const [onoff, setonoff] = useState(false)
  const [isloading, setislaoding] = useState(true)
  const[addreSS,setaddreSS]=useState({})
  /// customAlert
  const [alertact, setalertact] = useState({ msg: "", boll: false, icon: "", des: "" })
  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(() => {
    setislaoding(false)
  }, [location]);

  const getLiveLocation = async () => {
    try {
      const locPerssionDenied = await locationPermission();
      if (locPerssionDenied) {
        const { latitude, longitude } = await getCurrentLocation();
        setlocation({
          latitude,
          longitude,
        })
        

      }
    } catch (error) {
      Alert.alert(
        'Error getting location permission',
        error.message,
        [{ text: 'OK', onPress: getLiveLocation }],
      );
    }
  };
  const handleonoff = () => {

    if (Pnumber !== '' && Uname !== '') {
      if (location.latitude && location.longitude) {
        setonoff(true)
      }
      else {
        setalertact({ msg: 'Error Fetch Location', bull: true, icon: "alert", des: "" })
      }
    }
    else {
      setalertact({ msg: 'Field is Blanked', bull: true, icon: "alert", des: "" })
      setPnumber('')
      setUname('')
      setPlacename('')
    }


  }
  const hidevisible = (val) => {
    setalertact({ msg: "", bull: val, icon: "", des: "" })
  }
  //fianl submit button
  const selectedlocation = () => {
    setalertact({ msg: "Your Placess is Found ", bull: true, icon: "check-circle", des:''})
    console.log(Uname, " ",Pnumber+1, " ", Placename," ",addreSS.latitude,)
    
    
    /* axios.post(`${DataBase}/insertLocation`, {
      Name: Uname,
      Phone: Pnumber,
      Locationname:Placename,
      lat:addreSS.latitude,
      lang:addreSS.longitude
    })
      .then(response => { 
        console.log('Insert New Location successfully:', response.data);
      })
      .catch(error => {
        Alert.alert('Error submitting New Location:', error);
        // Handle error accordingly
      }); */
    //navigation.goBack();
    
  }
  const fetchlocation = (val) => {
    console.log("chesse " + val.latitude + val.longitude)
    setaddreSS(val)
  }


  return (
    <SafeAreaView style={{ flex: 1, }}>
      {
        !onoff ? (
          <View style={{ margin: '5%', marginVertical: '20%' }}>
            <TextInput
              label="Enter Your Phone Number"
              value={Pnumber}
              keyboardType="number-pad"
              onChangeText={Pnumber => setPnumber(Pnumber)}
              mode='outlined'
              style={{ marginVertical: '4%' }}

            />
            <TextInput
              label="Enter Your Name"
              value={Uname}
              onChangeText={Uname => setUname(Uname)}
              mode="outlined"
              style={{ marginVertical: '4%' }}
            />
            <TextInput
              label="Enter Your Place Name"
              value={Placename}
              onChangeText={Placename => setPlacename(Placename)}
              mode="outlined"
              style={{ marginVertical: '4%' }}
            />

            <Button
              mode="contained"
              icon={({ color, size }) => (
                <Entypo name='direction' color={color} size={30} />
              )}
              style={{ marginVertical: '4%', height: 60, justifyContent: "center" }}
              onPress={handleonoff}
              loading={isloading}
              disabled={isloading}
            >
              Choose Location
            </Button>

          </View>
        ) : null
      }
      {
        location.latitude && location.longitude && onoff ? (
          <View>
            <NewPlacesMap
              location={location}
              fetchlocation={fetchlocation}
            />
            <Button
              mode="contained"
              onPress={selectedlocation}
            >
              Submit
            </Button>
          </View>

        ) : null
      } 
      {
        alertact ? (
          <ALERT
            visible={alertact}
            hidevisible={hidevisible}
          />
        ) : null
      }


    </SafeAreaView>


  );
}
const NewPlacesMap = ({ location, fetchlocation }) => {
  const mapREf = useRef()

  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.001,
  });
  const [curloc, setcurloc] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.001,
  });
  useEffect(() => {
    const newCoords = {
      latitude: curloc.latitude,
      longitude: curloc.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapREf.current?.animateToRegion(newCoords, 3000);
  }, [curloc]);


  const markerY = useSharedValue(0);
  const isMapPressed = useSharedValue(false);


  const onRegionChange = (newRegion) => {
    //console.log(newRegion)
    setRegion(newRegion);
    fetchlocation(newRegion)

  };

  const onPressMap = () => {
    isMapPressed.value = true;
    markerY.value = withSpring(-5);
  };

  const onReleaseMap = () => {
    isMapPressed.value = false;
    markerY.value = withSpring(0);
  };

  const markerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: isMapPressed.value ? markerY.value : withSpring(markerY.value) },
      ],
    };
  });
  const fetchDestinationCords = (lat, lng) => {
    console.log("lat = ", lat)

    setRegion({ latitude: lat, longitude: lng });
    setcurloc({ latitude: lat, longitude: lng })
    //console.log("lng = ", lng)
  }
  //console.log("REGIN   = >>>\n", region)

  return (
    <View style={{ height: '90%' }}>
      <AddressPickup
        placeholderText="Enter Destination Location" 
        fetchAddress={fetchDestinationCords} />
      <MapView
        style={{ width: '100%', height: '90%' }}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        onTouchStart={onPressMap}
        onTouchEnd={onReleaseMap}
        ref={mapREf}
      >
        <Marker
          coordinate={curloc}
        >
          <View >
            <Text>
              <Ionicons name="woman" size={50} color="#DD237F" />
            </Text>
          </View>
        </Marker>

      </MapView>
      <Animated.View style={[styles.markerFixed, markerStyle]}>
        <View style={styles.marker}>
          <Text>
            <Entypo name="location-pin" size={45} color="black" />
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 78,
    width: 68,
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});

