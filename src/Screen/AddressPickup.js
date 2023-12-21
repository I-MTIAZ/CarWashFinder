import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform ,Keyboard} from 'react-native';
import { Button } from 'react-native-paper';
import { Google_API } from '../Constrains/GoogleApi';

export const AddressPickup = ({ placeholderText, fetchAddress }) => {
  const [address, setAddress] = useState('');

  const onPressAddress = async () => {
    try {
      // Encode the address to make it URL-safe
      const encodedAddress = encodeURIComponent(address);

      // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
      const apiKey = Google_API;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Error fetching location data');
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const { lat, lng } = location;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        fetchAddress(lat, lng);
      } else {
        console.error('No results found for the given address');
      }
    } catch (error) {
      console.error('Error getting location data:', error);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKey('20%')
      console.log("start")
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      console.log("end")
      setKey('10%')
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [keyboardAvoidingViewHeight,setKey] = useState('10%')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ height: keyboardAvoidingViewHeight }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TextInput
          style={[styles.textInputStyle]}
          placeholder={placeholderText}
          value={address}
          onChangeText={setAddress}
        />
        <Button
          mode="contained"
          onPress={onPressAddress}
          style={{ height: 50, width: '30%',borderRadius:0 }}
          icon="magnify"
        >
          Search
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    height: 48,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#F395F3',
    paddingLeft: 10,
    width: '70%',
  },
});
