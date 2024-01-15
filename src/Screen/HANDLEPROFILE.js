import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Text, Modal } from 'react-native';

import { TextInput, Button, Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
const { height } = Dimensions.get("window");

const MODE = "outlined"
const logoCol = "#00674b"
const logosize = 24
const TXtcolor = "#00674b"
const Fontsize = height / 40
const Fontweight = 'bold'
const Fontfamily = ""

export const HANDLEPROFILE = ({ value, close_btn }) => {
    const [info, setinfo] = useState("");
    const sentclose = () => {
        close_btn(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '2%' : 0 }}>
            <Modal visible={value.bool} animationType='slide'>



                <View style={{ flex: 1 }}>

                    <Appbar.Header style={{ backgroundColor: "white" }}>
                        <Appbar.BackAction onPress={() => sentclose()} />
                    </Appbar.Header>



                    <View style={styles.card}>
                        {
                            value.data === "Name" && (
                                <AntDesign name="edit" color='#00674b' size={50} />
                            )
                        }
                        {
                            value.data === "Email" && (
                                <MaterialCommunityIcons name="email-edit-outline" color='#00674b' size={50} />
                            )
                        }
                        <Text style={styles.card_txt}>{value.data}</Text>
                    </View>
                    <View >
                        <TextInput
                            label={`Select Your ${value.data}`}
                            value={info}
                            /* keyboardType="phone-pad" */
                            onChangeText={data => setinfo(data)}
                            mode='outlined'
                            style={styles.textinput}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "center", }}>
                            <Button
                                icon={() => <MaterialCommunityIcons name="close-circle-outline" size={logosize} color={logoCol} />}
                                mode={MODE}
                                onPress={() => sentclose()}
                                style={styles.btn}
                                theme={{ roundness: 2 }}
                                contentStyle={{ flexDirection: "row-reverse" }}
                                labelStyle={{
                                    fontSize: Fontsize, // Adjust the font size as needed
                                    fontWeight: Fontweight, // Use 'bold' for bold text
                                    color: TXtcolor,
                                    fontFamily: Fontfamily,
                                }}
                            >
                                Cancle
                            </Button>
                            <Button
                                icon={() => <MaterialCommunityIcons name="content-save-check-outline" size={logosize} color={logoCol} />}
                                mode={MODE}
                                onPress={() => sentclose()}
                                style={styles.btn}
                                theme={{ roundness: 2 }}
                                contentStyle={{ flexDirection: "row-reverse" }}
                                labelStyle={{
                                    fontSize: Fontsize, // Adjust the font size as needed
                                    fontWeight: Fontweight, // Use 'bold' for bold text
                                    color: TXtcolor,
                                    fontFamily: Fontfamily,
                                }}
                            >
                                Save
                            </Button>

                        </View>
                    </View>

                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textinput: {
        marginVertical: '4%',
        marginLeft: '2%',
        marginRight: '2%',
        backgroundColor: "white",
    },
    btn: {
        width: height / 5,
        margin: '1.5%'
    },
    card: {
        height: height / 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E1E8E4",
        flexDirection: "column",
        borderRadius: 15,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    card_txt: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#00674b",
        marginTop: 10

    }
})



