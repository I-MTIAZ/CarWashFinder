import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export const UNDERCONTRUCTION = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 30, textAlign: "center" }}>This Page is Under Construction </Text>
            <Text style={{ fontSize: 30, textAlign: "center" }}>Please Try Again Leter</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

