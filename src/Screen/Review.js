import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TextInput,Dimensions } from 'react-native';
import CustomBtn from './CustomBtn';
import { COLOR } from '../Constrains/COLOR';
const transparent = '#828282'
import { Rating, AirbnbRating } from 'react-native-ratings';
const { height } = Dimensions.get("window");
import axios from 'axios';

export const Review = ({ value, close_btn,location }) => {
    const [star, setStar] = useState()
    const [textInput, setTextInput] = useState('');

   
    const HAHA = (a) => {
        setStar(a)
    }
    console.log(star)
    console.log(textInput)

    const submitReview = () => {
        // Make a POST request to insert a new review on the server
        axios.post('http://192.168.68.110:300/insertReview', {
          star: star,
          text: textInput,
          location:location.titles
        })
          .then(response => {
            console.log('Review submitted successfully:', response.data);
          })
          .catch(error => {
            console.error('Error submitting review:', error);
            // Handle error accordingly
          });
        close_btn(false);
      };
      
      



    return (
        <View>
            <Modal visible={value} animationType='slide' transparent={true}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <View
                        style={{
                            backgroundColor: transparent,
                            padding: 15,
                            width: '90%',
                            height: '80%',
                            borderRadius: 10,
                        }}>
                        <Text style={{ fontSize: 25, color: COLOR.Snow, textAlign: "center" }}>Your brief review can make a big impact!</Text>

                        <AirbnbRating
                            count={5}
                            reviews={["Bad", "OK", "Good", "Very Good", "Amazing",]}
                            defaultRating={1}
                            size={30}
                            onFinishRating={(rat) => HAHA(rat)}
                            reviewSize={25}
                            starImage={require('../img/ratt.jpg')}
                            selectedColor="white"

                        />
                        <View style={styles.txt_area}>
                            <TextInput
                                value={textInput}
                                onChangeText={(text) => setTextInput(text)}
                                placeholder="Type here..."
                                style={styles.txt_m}
                            />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={{
                                height: '30%', width: '100%', backgroundColor: COLOR.Snow,
                                alignItems: "center", justifyContent: "center"
                            }}
                            onPress={submitReview}
                            >
                                <Text style={{ fontSize: 25 }}>submit</Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    texth: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    txt_area:{
        height: height/3,
        backgroundColor:"white",
        borderRadius:25,
        padding:'5%',
        marginVertical: height/29
    },
    txt_m:{
        fontSize:20,
        fontWeight: "bold",
        color: "black"

    }
})


