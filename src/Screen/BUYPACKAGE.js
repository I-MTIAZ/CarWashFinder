import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Review } from './Review';
import { MODAL } from './MODAL';

export const BUYPACKAGE = () => {
    return (
        <View>
            <MODAL
                value={true}
                routedistance={{dist:50,duration:25}}
                locationame={"Anderkilla"}
                star={3}
            />
        </View>
    );
}

const styles = StyleSheet.create({})


