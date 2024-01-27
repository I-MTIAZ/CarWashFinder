import React, { useState } from 'react';
import { View, StyleSheet, Linking, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Colorf} from '../Constrains/COLOR'
import LottieView from 'lottie-react-native';

export const QRSCAN = (props) => {
    console.log("hahah",props.route.params.number)

    return (
        <View style={styles.container}>
            <LottieView 
            style ={{height:250,width:250}} 
            source={require('../img//anim.json')}
            autoPlay loop />
            <QRCode
                value={props.route.params.number}
                size={250}
                color={Colorf.c}
                backgroundColor={Colorf.b}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colorf.b
    },
    centerText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20
    },
});

export default QRSCAN;
