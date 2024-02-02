import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Colorf } from '../Constrains/COLOR';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' // 
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons' // 
import { Platinum, Ptitle } from '../Helperfuncton/Handlereward';
const { height } = Dimensions.get("window");
import { Snackbar } from 'react-native-paper';



export const Reward = () => {

    /// Data base ///

    const [progress, setProgress] = useState(0);
    const [progressNo, setProgressNo] = useState(2);
    const [points, setPoints] = useState(100);

    /// Data base ///

    const [focusedIndex, setFocusedIndex] = useState(null);

    const [Pageno, setPageno] = useState(1)
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [visible, setVisible] = useState(false);
    const [backgroundcolor, setbackgroundcolor] = useState();

    // Names & color
    const buttonNames = ['Platinum', 'Diamond', 'Gold'];
    const progressColor = [Colorf.platinum, Colorf.diamond, Colorf.gold];

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
        if (index > 0) {
            setFocusedIndex(index - 1);
            setbackgroundcolor(progressColor[index - 1])
            setPageno(index)
            if (index > progressNo) {
                setProgress(0)
            }
            else if (index < progressNo) {
                setProgress(1)
            }
            else {
                setProgress(0.5)
            }
        }
        else {
            setPageno(progressNo)
            setFocusedIndex(progressNo - 1)
            setProgress(0.5)
            setbackgroundcolor(progressColor[progressNo - 1])
        }

    };


    useEffect(() => {
        handleFocus()
    }, []);



    const formatText = (progress) => {
        return <View style={{}}>
            <Text style={{
                fontSize: height / 40, fontWeight: "bold", textAlign: "center", marginBottom: height / 50,
                color: Colorf.c
            }}>Platinim</Text>
            <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: "center",
                marginBottom: height / 80
            }}>

                <MaterialCommunityIcons
                    name="trophy"
                    size={height / 18}
                    color={Colorf.c}
                />
                <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: height / 35, color: Colorf.c }}>{Math.round(progress * 100)}%</Text>
            </View>
            <Text style={{ fontSize: height / 50, fontWeight: "bold", color: Colorf.c }}>Total Points {points}</Text>
        </View>
    };

    return (
        <SafeAreaView style={{
            flex: 1, paddingTop: Platform.OS === 'android' ? '0%' : '0%',
            backgroundColor: Colorf.b
        }}>
            <View style={{ backgroundColor: Colorf.b, flex: 1 }}>


                <View style={[styles.topcontainer, { backgroundColor: backgroundcolor }]}>
                    
                    <Progress.Circle progress={progress} size={height / 4}
                        color={Colorf.c} thickness={height / 160} borderWidth={2.5}
                        formatText={formatText}
                        showsText
                        borderColor={Colorf.c}
                    />
                </View>

                <View style={styles.btnheader}>
                    {buttonNames.map((buttonName, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleFocus(index + 1)}
                            style={[styles.topbtn, focusedIndex === index && {
                                borderBottomColor: Colorf.c,
                                borderBottomWidth: 2,
                            }]}
                        >
                            <Text style={[focusedIndex === index && {
                                color: Colorf.c
                            }, { fontWeight: "bold" }]}>{buttonName}</Text>


                        </TouchableOpacity>
                    ))}
                </View>

                {
                    Pageno === 1 ? (

                        <View style={{ marginTop: '5%', }}>
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
                                                size={height / 25}
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
        borderColor: Colorf.c1,
        borderWidth: 1.7,
        //justifyContent:"center",
        marginVertical: '3%',
        paddingLeft: height / 15,
        width: "90%",
        marginLeft: "auto",
        marginRight: 'auto',
        backgroundColor: "white"


    },
    topbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height / 15,
        justifyContent: "center",
        width: '33%',
    },
    btnheader: {
        flexDirection: "row",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%'
    },
    rewbody: {
        fontSize: height / 45,
        fontWeight: "800"
    },
    rewtitle: {
        fontSize: height / 40,
        fontWeight: "bold"
    },
    topcontainer: {
        alignItems: "center",
        backgroundColor: Colorf.c1,
        height: height / 3.5,
        justifyContent: "center"
    }
})


