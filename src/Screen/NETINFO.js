import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const NETINFO = ({ onNetworkChange,props}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
      onNetworkChange && onNetworkChange(state.isConnected);
      if (!state.isConnected) {
        // Show an alert when isConnected is false
        Alert.alert('Network Connection Issue', 'Please check your internet connection.', [
          { text: 'OK', onPress: checkNetwork },
        ]);
        //onNetworkChange && onNetworkChange(false);
      } else {
        // Call the parent component's function when the network is connected
        //onNetworkChange && onNetworkChange(true);
      }
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Initial check when the component mounts
    checkNetwork();

    return () => {
      unsubscribe();
    };
  }, [onNetworkChange, isConnected]);

  return <View />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
