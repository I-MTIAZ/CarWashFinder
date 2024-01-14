import React from 'react';
import { View, Button, StyleSheet, Linking } from 'react-native';

const latitude = 22.34066970750502;
const longitude = 91.83665293592948;

export const GoogleMapView = () => {
  const openGoogleMap = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;

    Linking.openURL(url).catch((err) => console.error('Error opening map:', err));
  };

  return (
    <View style={styles.container}>
      {/* Your other components here */}
      <Button title="Open Google Maps" onPress={openGoogleMap} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


