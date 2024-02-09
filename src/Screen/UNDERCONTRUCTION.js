import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import axios from 'axios';
import { DataBase } from '../Constrains/GoogleApi';
import { WebView } from 'react-native-webview';

export const UNDERCONTRUCTION = () => {

    const[URL,setURL]=useState()
   
 
    

    const handlepayment = async () => {
        try {
            const { data } = await axios.post(`${DataBase}/api/bkash/payment/create`,
                { amount: 100, orderId: 1 }, { withCredentials: true })
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
            const Status = decodeURIComponent(getQueryParam(url, 'status'));
            if(Status === 'cancel'){
                setURL(false)
                console.warn("Payment Cancel")
            }
            if(Status === 'failure'){
                setURL(false)
                console.warn("Payment Failure")
            }
            if(Status === 'Insufficient Balance'){
                setURL(false)
                console.warn("Insufficient Balance")
            }
        } 
       
        if (url.includes(`${DataBase}/success`)) {
            setURL(false)
            console.warn('Payment success');
        }
    };
    
  
   


return (
    <View style={{ flex: 1 }}>
        {/* <Text style={{ fontSize: 30, textAlign: "center" }}>This Page is Under Construction </Text>
            <Text style={{ fontSize: 30, textAlign: "center" }}>Please Try Again Leter</Text> */}
        {
            URL ? (
                <WebView
                onNavigationStateChange={handleNavigationStateChange} 
                source={{ uri: URL }} // Replace this URL with the URL provided by the payment system
                style={{ flex: 1 }} // Adjust the style as per your layout requirements
              />
            ):null
        }
        {
            !URL?(
                <View style={{}}>
                    <Button title='Pay BCASHHH' onPress={handlepayment} />
                </View>
            ):null
        }
        
    </View>
);
}

const styles = StyleSheet.create({})

