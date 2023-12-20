import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, Image, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { locationPermission, getCurrentLocation } from '../Helperfuncton/Helperfun';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import markerImage from '../img/currentlocation.png';

export const NewPlaces = () => {
  const [region, setRegion] = useState({
    latitude: 22.332671112167628,
    longitude: 91.84030073971839,
    latitudeDelta: 0.02,
    longitudeDelta: 0.001,
  });

  const markerY = useSharedValue(0);
  const isMapPressed = useSharedValue(false);

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    try {
      const locPerssionDenied = await locationPermission();
      if (locPerssionDenied) {
        const { latitude, longitude } = await getCurrentLocation();
        setRegion({
          latitude,
          longitude,
        });
      }
    } catch (error) {
      Alert.alert(
        'Error getting location permission',
        error.message,
        [{ text: 'OK', onPress: getLiveLocation }],
      );
    }
  };

  const onRegionChange = (newRegion) => {
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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1, height: '50%', width: '100%' }}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        onTouchStart={onPressMap}
        onTouchEnd={onReleaseMap}
      ></MapView>
      <Animated.View style={[styles.markerFixed, markerStyle]}>
        <Image style={styles.marker} source={markerImage} />
      </Animated.View>
      <SafeAreaView style={styles.footer}>
        <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text>
      </SafeAreaView>
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
    height: 58,
    width: 58,
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

