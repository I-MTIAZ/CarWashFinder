import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Text } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome' //edit

import MaterialIcons from 'react-native-vector-icons/MaterialIcons' //drive-file-rename-outline  smartphone email
import { HANDLEPROFILE } from './HANDLEPROFILE';
 
const { height } = Dimensions.get("window");

export const PROFILE = (props) => {

    const logoheight = height / 25
    //console.log(props.route.params)

    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);


    const [modalvisible, setmodalVisible] = useState({ bool: false, data: "" });



    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '2%' : 0 }}>
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: "center", marginTop: '8%' }}>
                    <FontAwesome name="user-circle-o" color='#00674b'
                        size={height / 6} />
                    <Text style={{ marginTop: '6%' }}>Imtiaz{props.route.params}</Text>
                </View>

                <View style={{ margin: height / 55 }}>
                    <TouchableOpacity onPress={() => setmodalVisible({ bool: true, data: "Name" })} style={styles.btn}>

                        <FontAwesome name="edit" color='#00674b' size={logoheight} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.btn_txt}>Name</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setmodalVisible({ bool: true, data: "Email" })} style={styles.btn}>
                        <MaterialIcons name="email" color='#00674b' size={logoheight} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.btn_txt}>Email</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onToggleSnackBar} style={styles.btn}>
                        <MaterialIcons name="smartphone" color='#00674b' size={logoheight} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.btn_txt}>Phone : {props.route.params}012458787</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <HANDLEPROFILE
                    value={modalvisible}
                    close_btn={(val) => setmodalVisible({ bool: val })}
                />
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    duration={1000}
                    style={{ alignItems: "center", justifyContent: "center", backgroundColor: "red" }}
                >
                    Phone Number Can't be Changed.
                </Snackbar>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height / 9,
        backgroundColor: 'white',
        paddingLeft: height / 30,
        marginVertical: height / 55,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 0.5,
    },
    btn_txt: {
        color: "#00674b",
        fontWeight: "bold",
        fontSize: 15
    }
});



