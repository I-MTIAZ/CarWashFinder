// NETINFO.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

export const NETINFO = ({ onNetworkChange }) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        // Show an alert when isConnected is false
        Alert.alert(
          'Network Connection Issue',
          'Please check your internet connection.',
          [{ text: 'OK' }]
        );
      } else {
        // Call the parent component's function when the network is connected
        onNetworkChange && onNetworkChange();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [onNetworkChange]);

  return (
    <View/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
