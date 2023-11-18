import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const CustomBtn = ({
  onPress = () => {},
  btnStyle = {},
  btnText,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnStyle, btnStyle]}>
      <Text style={{fontSize:20}}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btnStyle: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
  },
});
