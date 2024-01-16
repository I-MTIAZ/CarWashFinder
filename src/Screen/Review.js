import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { Colorf } from '../Constrains/COLOR';
const transparent = '#E1E8E4'
import { Rating } from 'react-native-ratings';
const { height } = Dimensions.get("window");
import axios from 'axios';
import { DataBase } from "../Constrains/GoogleApi";


import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const SIZE = height / 25
const Revsize = 25
const Revcolor = Colorf.c

export const Review = ({ value, close_btn, location, username }) => {

    const [clean, setclean] = useState(0)
    const [hygiene, sethygiene] = useState(0)
    const [secure, setsecure] = useState(0)
    const [textInput, setTextInput] = useState('');
    const characterLimit = 100; // set your desired character limit
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const handleTextChange = (text) => {
        if (text.length <= characterLimit) {
            setTextInput(text);
        }
    };



    const characterCount = textInput.length;
    const remainingCharacters = characterLimit - characterCount
    //console.log(username)


    //console.log(star)
    //console.log(textInput)

    const submitReview = () => {

        if(clean === 0 || hygiene === 0  || secure === 0  )
        {
            onToggleSnackBar()
        }
        // Make a POST request to insert a new review on the server
        /* axios.post(`${DataBase}/insertReview`, {
            star: star,
            text: textInput,
            location: location.titles,
            uname: username
        })
            .then(response => {
                console.log('Review submitted successfully:', response.data);
            })
            .catch(error => {
                Alert.alert('Error submitting review:', error);
                // Handle error accordingly
            });
        close_btn(false); */
        console.log(clean,hygiene,secure)
        console.log(clean+hygiene+secure)
        console.log((clean+hygiene+secure)/3)
    };
    const closebtn = () => {
        close_btn(false);
    }

    return (

        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '2%' : 0 }}>
            <Modal visible={value} animationType='slide'>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <View
                        style={{
                            backgroundColor: transparent,
                            width: '100%',
                            height: '100%',
                        }}
                    >


                        <View style={styles.card}>
                            <MaterialIcons name="reviews" size={height / 15} color={Colorf.c} />
                            <Text style={styles.card_txt}>Your brief review can make a big impact!</Text>
                        </View>


                        <View style={styles.txt_area}>
                            <TextInput
                                value={textInput}
                                onChangeText={handleTextChange}
                                placeholder="Type here..."
                                style={styles.textinput}
                                activeUnderlineColor={Colorf.c}
                                multiline={true}
                                numberOfLines={2}

                            />
                            <Text style={{ margin: '5%',color:Colorf.d }}>{`Remaining character: ${remainingCharacters}/${characterLimit}`}</Text>

                        </View>

                        <View style={styles.rev}>
                            <Text style={styles.rev_txt} >Cleaness</Text>
                            <Rating
                                imageSize={SIZE}
                                onFinishRating={(rat) => setclean(rat)}
                                startingValue={0}
                            />


                            <Text style={styles.rev_txt} >Hygiene</Text>
                            <Rating
                                imageSize={SIZE}
                                onFinishRating={(rat) => sethygiene(rat)}
                                startingValue={0}
                            />

                            <Text style={styles.rev_txt} >Secure</Text>
                            <Rating
                                imageSize={SIZE}
                                onFinishRating={(rat) => setsecure(rat)}
                                startingValue={0}
                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "center", }}>

                            <Button
                                icon={() => <AntDesign name="checkcircle" size={height / 35} color={Colorf.c} />}
                                mode="outlined"
                                onPress={() => submitReview()}
                                style={styles.btn}
                                theme={{ roundness: 2 }}
                                contentStyle={{ flexDirection: "row-reverse" }}
                                labelStyle={{
                                    fontSize: height / 35, // Adjust the font size as needed
                                    fontWeight: 500, // Use 'bold' for bold text
                                    color: Colorf.c,
                                    fontFamily: Colorf.f,
                                }}
                            >
                                Submit
                            </Button>
                            <Button
                                icon={() => <AntDesign name="closecircle" size={height / 35} color={Colorf.c} />}
                                mode="outlined"
                                onPress={() => closebtn()}
                                style={styles.btn}
                                theme={{ roundness: 2 }}
                                contentStyle={{ flexDirection: "row-reverse" }}
                                labelStyle={{
                                    fontSize: height / 35, // Adjust the font size as needed
                                    fontWeight: 500, // Use 'bold' for bold text
                                    color: Colorf.c,
                                    fontFamily: Colorf.f,
                                }}
                            >
                                Not Now
                            </Button>
            
                        </View>
                        <Snackbar
                                visible={visible}
                                onDismiss={onDismissSnackBar}
                                duration={2000}
                                style={{ alignItems: "center", justifyContent: "center", backgroundColor: Colorf.d}}
                            >
                                Plese Fill All Ratings
                            </Snackbar>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    txt_area: {
        height: height / 5,
        backgroundColor: "white",
        borderRadius: 25,
        marginLeft: '2%',
        marginRight: '2%',

    },
    textinput: {
        marginLeft: '2%',
        marginRight: '2%',
        backgroundColor: "white",
        fontWeight: "700",
        marginTop: '3%',
        maxHeight: 85,





    },
    btn: {
        backgroundColor: "white",
        margin: '1.5%'
    },
    rev: {
        alignItems: "center",
        backgroundColor: "white",
        marginLeft: '2%',
        marginRight: '2%',
        borderRadius: 20,
        padding: '5%',
        marginVertical: '2%'
    },
    rev_txt: {
        fontSize: height / 30,
        marginTop: '5%',
        marginBottom: '2%',
        color: Colorf.c,
        fontWeight: '600'
    },
    card: {
        height: height / 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E1E8E4",
        flexDirection: "column",
        borderRadius: 15,
        marginLeft: '2%',
        marginRight: '2%',
        borderColor: "#00674b"

    },
    card_txt: {
        fontSize: height / 30,
        fontWeight: "bold",
        color: "#00674b",
        alignItems: "center",
        justifyContent: "center",


    }
})


