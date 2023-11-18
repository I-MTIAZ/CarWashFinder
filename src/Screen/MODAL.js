import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import CustomBtn from './CustomBtn';
import { COLOR } from '../Constrains/COLOR';
const transparent = 'rgba(0,0,0,0.5)'

export const MODAL = ({ value,close_btn,confirm_btn,routedistance }) => {
    ///sent data
    const sentclose =()=>{
        close_btn(false);
    }  

    ///sent confirm data
    const sentconfirm =()=>{
        confirm_btn(true);
    }
    

    return (
        <View>
            <Modal visible={value} animationType='slide' transparent={true}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <View
                        style={{
                            backgroundColor: transparent,
                            padding: 15,
                            width: '90%',
                            height: '60%',
                            borderRadius: 10,
                        }}>
                        <Text style={{ fontSize: 25, color: COLOR.Snow }}>MODAL IS COMING OUT</Text>
                        <Text style={{ fontSize: 20, color: COLOR.Snow,marginTop:5 }}>Distance {routedistance} meter</Text>
                        <Text style={{ fontSize: 20, color: COLOR.Snow,marginTop:5 }}>RAtting : 5</Text>
                        <Text style={{ fontSize: 20, color: COLOR.Snow,marginTop:5 }}>open time : 5 am to 5 pm</Text>
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={{
                                height: '30%', width: '100%', backgroundColor: COLOR.Snow,
                                alignItems: "center", justifyContent: "center"}}
                                onPress={()=>sentclose()}
                            >
                                <Text style={{ fontSize: 25 }}>close</Text>
                                
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: '30%', width: '100%', backgroundColor: COLOR.SeaGreen,
                                alignItems: "center", justifyContent: "center",marginTop:20}}
                                onPress={()=>sentconfirm()}
                            >
                                <Text style={{ fontSize: 25 }}>Confirm</Text>
                                
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}



const styles = StyleSheet.create({});
