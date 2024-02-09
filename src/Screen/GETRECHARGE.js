import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';
import axios from 'axios';
import { DataBase } from '../Constrains/GoogleApi';
import { WebView } from 'react-native-webview';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colorf } from '../Constrains/COLOR';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { isValidAmount } from '../Helperfuncton/Helperfun';
import { ALERT } from '../Constrains/ALERT';



const { height } = Dimensions.get("window");
export const GETRECHARGE = () => {
    //custom Alert
    const [alertact, setalertact] = useState({ msg: "", boll: false, icon: "", des: "" })
    const [amount, setamount] = useState("")
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [erotilte, seterotitle] = useState("")
    const [URL, setURL] = useState()

    const hidevisible = (val) => {
        setalertact({ msg: "", bull: val, icon: "", des: "" })
      }

    const handlepayment = async () => {
        try {
            const Amount = parseInt(amount, 10)
            const { data } = await axios.post(`${DataBase}/api/bkash/payment/create`,
                { amount: Amount, orderId: 1 }, { withCredentials: true })
            setURL(data.bkashURL)
            //console.log(data.URLL)
        } catch (error) {
            console.log("salam")
        }

    }


    const handleNavigationStateChange = (navState) => {
        const { url } = navState;
        const getQueryParam = (url, param) => {
            const params = url.split('?')[1];
            if (!params) return null;

            const paramValue = params
                .split('&')
                .find((paramPair) => paramPair.split('=')[0] === param);

            return paramValue ? paramValue.split('=')[1] : null;
        };
        if (url.includes(`${DataBase}/error`)) {
            // Set the status message when navigating to ${server}/cancle
            setamount("")
            const Status = decodeURIComponent(getQueryParam(url, 'status'));
            if (Status === 'cancel') {
                setURL(false)
                setalertact({ msg: 'Payment Cancle', bull: true, icon: "alert", des: "" })
            }
            if (Status === 'failure') {
                setURL(false)
                setalertact({ msg: 'Payment Failure', bull: true, icon: "alert", des: "" })
            }
            if (Status === 'Insufficient Balance') {
                setURL(false)
                //console.warn("Insufficient Balance")
                setalertact({ msg: 'Insufficient Balance', bull: true, icon: "alert", des: "" })

            }
        }

        if (url.includes(`${DataBase}/success`)) {
            setamount("")
            setURL(false)
            //console.warn('Payment success');
            setalertact({ msg: 'Recharge successful', bull: true, icon: "check-circle", des: "" })
        }
    };

    const handleamount = () => {
        const isvalied = isValidAmount(amount)
        if (amount !== '') {
            if (isvalied) {
                handlepayment()
            }
            else {
                setamount("")
                seterotitle("Number is Not Valid")
                onToggleSnackBar()
            }
        }
        else {
            setamount("")
            seterotitle("Field is empty")
            onToggleSnackBar()

        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colorf.b }}>
            {
                URL ? (
                    <WebView
                        onNavigationStateChange={handleNavigationStateChange}
                        source={{ uri: URL }} // Replace this URL with the URL provided by the payment system
                        style={{ flex: 1 }} // Adjust the style as per your layout requirements
                    />

                ) : (
                    <View >
                        <View style={{
                            alignItems: "center", height: height / 3, backgroundColor: Colorf.c,
                            justifyContent: "center",

                        }}>
                            <View style={{
                                height: height / 4.8, width: height / 4.8, borderRadius: height / 2.2, borderWidth: 3,
                                borderColor: Colorf.w, alignItems: "center", justifyContent: "center",
                                marginHorizontal: '5%'
                            }}>
                                <View style={{ flexDirection: "row", }}>
                                    <Text style={{ fontSize: height / 25, fontWeight: "bold", color: Colorf.w }}>50</Text>
                                    <MaterialCommunityIcons
                                        name="currency-bdt"
                                        size={height / 20}
                                        color={Colorf.w} />
                                </View>
                                <Text style={{ fontSize: height / 35, fontWeight: "500", color: Colorf.w }}>Balance</Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: '5%' }}>
                            <Text style={{
                                fontSize: 20, fontWeight: "800",
                                textAlign: "center", color: Colorf.c,
                                marginVertical: '5%'
                            }}>Recharge Your Balance</Text>
                            <View style={styles.txt_area}>
                                <TextInput
                                    label={`Select Your Balance`}
                                    value={amount}
                                    keyboardType="phone-pad"
                                    onChangeText={(text) => setamount(text)}
                                    mode='outlined'
                                    activeOutlineColor="#00674b"
                                />
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Button
                                    icon={() => <MaterialIcons name="navigate-next" size={height / 30} color={Colorf.c} />}
                                    mode="outlined"
                                    onPress={() => handleamount()}
                                    style={styles.btn}
                                    theme={{ roundness: 2 }}
                                    contentStyle={{ flexDirection: "row-reverse" }}
                                    labelStyle={{
                                        fontSize: height / 40, // Adjust the font size as needed
                                        fontWeight: 500, // Use 'bold' for bold text
                                        color: Colorf.c,
                                        fontFamily: Colorf.f,
                                    }}
                                >
                                    Next
                                </Button>
                            </View>
                        </View>
                    </View>
                )
            }
            {
                alertact ? (
                    <ALERT
                      visible={alertact}
                      hidevisible={hidevisible}
                    />
                  ) : null
            }
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={2000}
                style={{ backgroundColor: Colorf.d }}
            >
                {erotilte}
            </Snackbar>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    txt_area: {
        backgroundColor: Colorf.b,
        margin: '2%'
    },
    btn: {
        backgroundColor: "white",
        marginTop: '5%',
        width: height / 3,
    },
})


