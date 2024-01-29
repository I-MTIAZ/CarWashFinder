import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Colorf } from '../Constrains/COLOR';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' // 
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons' // 
import { Platinum, Ptitle } from '../Helperfuncton/Handlereward';
const { height } = Dimensions.get("window");
import { Snackbar } from 'react-native-paper';
import { findFocusedRoute } from '@react-navigation/native';


export const Reward = () => {

    /// Data base ///

    const [progress, setProgress] = useState(0.5);
    const [progressNo, setProgressNo] = useState(0);
    const [progressColor, setProgressColor] = useState(Colorf.c);
    const [points, setPoints] = useState(100);

    /// Data base ///

    const [focusedIndex, setFocusedIndex] = useState(null);
    const buttonNames = ['Platinum', 'Diamond', 'Gold'];
    const [Pageno, setPageno] = useState(1)
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [visible, setVisible] = useState(false);

    const handleplatinum = (index) => {
        const handlepoints = Platinum(index, points)
        if (handlepoints >= 0) {
            setPoints(handlepoints)
            
        }
        else {
            onToggleSnackBar()
        }
        console.log(`Button ${index} pressed`);
    };

    const handleFocus = (index) => {
        setFocusedIndex(index);
    };


    const formatText = (progress) => {
        return <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", }}>
                <MaterialCommunityIcons
                    name="trophy"
                    size={height/18}
                    color={Colorf.c}
                />
                <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: height/35 }}>{Math.round(progress * 100)}%</Text>
            </View>
            <Text style={{ fontSize: height/40, fontWeight: "bold" }}>Total Points {points}</Text>
            <Text style={{ fontSize: height/40, fontWeight: "bold",textAlign:"center" }}>Platinim</Text>
        </View>
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '4%' : '4%',
        backgroundColor: Colorf.b }}>
            <View style={{ backgroundColor: Colorf.b, flex: 1 }}>


                <View style={{ alignItems: "center" }}>
                    <Progress.Circle progress={progress} size={height/3.6}
                        color={Colorf.d} thickness={height/160} borderWidth={2.5}
                        formatText={formatText}
                        showsText
                        borderColor={Colorf.d}
                    />
                </View>

                <View style={styles.topcontainer}>
                    {buttonNames.map((buttonName, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleFocus(index)}
                            style={[styles.topbtn, focusedIndex === index && {
                                borderBottomColor: Colorf.c,
                                borderBottomWidth: 2,
                            }]}
                        >
                            <Text style={[focusedIndex === index && {
                                color:Colorf.c
                            },{fontWeight:"bold"}]}>{buttonName}</Text>


                        </TouchableOpacity>
                    ))}
                </View>

                {
                    Pageno === 1 ? (

                        <View style={{marginTop:'5%'}}>
                            {Object.values(Ptitle).map((value, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleplatinum(index + 1)}
                                    style={styles.btntou}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{
                                            justifyContent: "center",
                                            marginRight: '5%'
                                        }}>
                                            <SimpleLineIcons
                                                name="badge"
                                                size={height/25}
                                                color={Colorf.c}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.rewtitle}>{value.head}</Text>
                                            <Text style={styles.rewbody}>{value.body}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : null
                }

                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    duration={2000}
                    style={{ backgroundColor: Colorf.d, top: -180 }}
                >
                    You have not enough Points !
                </Snackbar>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btntou: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height / 9,
        borderRadius: 15,
        borderColor: Colorf.c,
        borderWidth: 1.7,
        //justifyContent:"center",
        marginVertical: '3%',
        paddingLeft: height / 15,
        width: "90%",
        marginLeft: "auto",
        marginRight: 'auto'


    },
    topbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height / 15,
        justifyContent: "center",
        width: '33%',
    },
    topcontainer: {
        flexDirection: "row",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%'
    },
    rewbody: {
        fontSize: height/45,
        fontWeight: "800"
    },
    rewtitle: {
        fontSize: height/40,
        fontWeight: "bold"
    },
})


