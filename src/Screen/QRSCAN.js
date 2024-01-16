import React, { useState } from 'react';
import { View, StyleSheet, Linking, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export const QRSCAN = () => {
    const[info,setinfo]=useState("Scanner")
    const handleQRCodeScanned = ({ data }) => {
        setinfo(data)
    };

    return (
        <View style={styles.container}>
            <QRCodeScanner
                onRead={handleQRCodeScanned}
                reactivate={true}
                reactivateTimeout={500}
                showMarker={true}
                topContent={<View><Text style={styles.centerText}>{info}</Text></View>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        fontSize: 16,
        color: 'black',
        marginBottom:20
    },
});

export default QRSCAN;
