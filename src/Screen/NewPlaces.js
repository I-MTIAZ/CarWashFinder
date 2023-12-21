import React, { useEffect, useState,useRef } from 'react';
import { View, StyleSheet, Text, Alert, Image, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { locationPermission, getCurrentLocation } from '../Helperfuncton/Helperfun';
import { Button } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import markerImage from '../img/currentlocation.png';
import { AddressPickup } from './AddressPickup';


export const NewPlaces = () => {
  const [location, setlocation] = useState({
    latitude: 0,
    longitude: 0
  })
  useEffect(() => {
    getLiveLocation();
  }, []);

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

  return (
    <SafeAreaView style={{ height: '100%' }}>
      {
        location.latitude && location.longitude ? (
          <NewPlacesMap
          location = {location}
          />
          
        ): <Text>LOADING</Text>
      }
      <Button
          mode="contained"
        >
          Submit
        </Button>

    </SafeAreaView>


  );
}
const NewPlacesMap = ({location}) => {
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
    
    setRegion({latitude:lat,longitude:lng});
    setcurloc({latitude:lat,longitude:lng})
    console.log("lng = ", lng)
  }
  console.log("REGIN   = >>>\n",region)

  return (
    <View style={{ height: '90%' }}>
      <AddressPickup
        placeholderText="Enter Destination Location"
        fetchAddress={fetchDestinationCords} />
      <MapView
        style={{  width: '100%',height: '90%' }}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        onTouchStart={onPressMap}
        onTouchEnd={onReleaseMap}
        ref={mapREf}
      >
        <Marker
          coordinate={curloc}
          title="Drag Me!"
          description="Your Location"
        />

      </MapView>
      <Animated.View style={[styles.markerFixed, markerStyle]}>
        <Image style={styles.marker} source={markerImage} />
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

