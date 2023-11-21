import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Dimensions,Platform } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import { useState, useRef, useEffect} from 'react';
import { locationPermission, getCurrentLocation } from '../Helperfuncton/Helperfun'
import { MODAL } from './MODAL'; 
import CustomBtn from './CustomBtn';
import { Google_API } from '../Constrains/GoogleApi'
import * as geolib from 'geolib';
import { COLOR } from '../Constrains/COLOR';
import { ListPages } from './ListPages';
import { stat } from 'react-native-fs';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const MapPage = (props) => {
    const mapRef = useRef()
    const markerRef = useRef()

    const information = props.route.params
    //console.log(information[1])

    // save current distance
    const [crnt_distance, set_crnt_distace] = useState('')

    const [state, setSate] = useState({
        curLoc: {
            latitude: 22.332671112167628,
            longitude: 91.84030073971839,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        destinationCords: {
            latitude: null,
            longitude: null,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        coordinate: new AnimatedRegion({
            latitude: 22.332671112167628,
            longitude: 91.84030073971839,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }),

    })

    const { curLoc, destinationCords,coordinate } = state

    //get live location every 5 second
    const [locCall, setlocCall] = useState(false)

    

    // GET LIVE Location
    useEffect(() => {
        // Call getLiveLocation immediately when the component mounts
        getLiveLocation();
    }, []);

    const getLiveLocation = async () => {
        try {
            const locPerssionDenied = await locationPermission();
            if (locPerssionDenied) {
                const { latitude, longitude } = await getCurrentLocation();
                console.log("get location after 5 seconds => ", latitude, " and ", longitude);
                setSate({
                    ...state,
                    curLoc: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    coordinate: new AnimatedRegion({
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.1,
                    })
                })

                if (locCall) {
                    //current location point A
                    const pointA = { latitude: latitude, longitude: longitude };

                    //Destination locatiom point B
                    const pointB = { latitude: savea_Place.latitudes, longitude: savea_Place.longitudes };

                    // Calculate distance between current location to select location
                    const distanceInMeters = geolib.getDistance(pointA, pointB);
                    set_crnt_distace(distanceInMeters)
                    console.log("seee its worked or not === > ", curLoc)
                    console.log("Distance:", distanceInMeters);

                }
            }

        } catch (error) {
            // Handle the error or rejection here
            console.error("Error getting location permission:", error);
            // You might want to set a state or show a message to the user
        }
    }




    useEffect(() => {
        let intervalId;
        if (locCall) {
            intervalId = setInterval(() => {
                getLiveLocation();
            }, 6000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [locCall]);



    console.log("Current distance------------------>", crnt_distance)

    // save a place's latitude and longitude
    const [savea_Place, setSaveaPlace] = useState({})

    //save current location for smooth direction
    const [save_curloc,setsave_curloc] = useState({})

    //marker ref
    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 6000);
            }
        } else {
            curLoc.timing(newCoordinate).start();
        }
    }


    // for mapref start for first time

    /* useEffect(() => {
        const newCoords = {
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        mapRef.current?.animateToRegion(newCoords, 5000);
    }, [curLoc]); */
    const onCenter = () => {
        mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009
        })
    }



    

    //set curlocatin to destination route  distance. Hold distance value

    const [routeDistance, setrouteDistance] = useState()

    //state for cancle route form current location to  destination 

    const [cnclBtn, setcnclBtn] = useState(false)

    //current location to destination route direction show if true else not 

    const [mapRoute, setmapRoute] = useState(false)

    //active modal view if true

    const [data, setdata] = useState(false)

    // define Modal function for Listpage
    const setModalforlist = (val) => {
        setdata(true)

        // save a certain place info for measure crnt distance

        // save current location
        setSaveaPlace(val)

        setsave_curloc(curLoc)

        setrouteDistance(val.distance)

        setSate({
            ...state,
            destinationCords: {
                latitude: val.latitudes,
                longitude: val.longitudes
            }
        })

    }
    






    //set modal
    const setModal = (val) => {
        // modal visualization if true
        setdata(true)

        //val = destination location
        console.log("destination ====", val)
        
        // save current location
        setsave_curloc(curLoc)
        

        //Save a place's info
        setSaveaPlace(val)

        //current location point A
        const pointA = { latitude: curLoc.latitude, longitude: curLoc.longitude };

        //Destination locatiom point B
        const pointB = { latitude: val.latitudes, longitude: val.longitudes };

        // Calculate distance between current location to select location
        const distanceInMeters = geolib.getDistance(pointA, pointB);

        //save distance 
        setrouteDistance(distanceInMeters)

        console.log("distance ====", distanceInMeters);

        // save select destination lcation
        setSate({
            ...state,
            destinationCords: {
                latitude: val.latitudes,
                longitude: val.longitudes
            }
        })
    }



    // fetch modal close button info from modal.js
    const modal_close_btn = (val) => {
        //val = false
        console.log("value ===>>>> ", val)
        setdata(val)
    }

    // fetch modal confirm button info from modal.js
    const modal_confirm_btn = (val) => {
        // val = true
        console.log("route info", val)
        setmapRoute(val)
        setcnclBtn(true)
        setdata(false)
        setlocCall(true)


    }
    //console.log("check Current distance show? ",curnt_dist_Show)
    

    //cancle button for route from current location to destination location
    const cancleRoute = () => {
        setlocCall(false)
        setmapRoute(false)
        setcnclBtn(false)
        set_crnt_distace('')
        //console.log("route info from cancle route", mapRoute)
    }

    

    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ height: mapRoute ? '70%' : '50%', width: '100%', marginBottom: 15 }}
                initialRegion={curLoc}
                ref={mapRef}
            >
                {
                     destinationCords.latitude && destinationCords.longitude && mapRoute ? (
                        <MapViewDirections
                            origin={save_curloc}
                            destination={destinationCords}
                            apikey={Google_API}
                            strokeWidth={2.5}
                            optimizeWaypoints={true}
                            resetOnChange={true}
                            onStart={(params) => {
                                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                            }}

                        />
                    ) : null
                }

                <Marker.Animated
                    ref={markerRef}
                    coordinate={coordinate}
                >
                    <Image
                        source={require("../img/currentlocation.png")}
                        style={{ width: 80, height: 80 }}
                    />
                </Marker.Animated>
                {
                    information.map((item, index) => (
                        <Marker key={index}
                            coordinate={{
                                latitude: item.latitudes,
                                longitude: item.longitudes,
                            }}
                            title={item.titles}
                            onPress={() => !cnclBtn && setModal(item)}
                        >
                            <Image
                                source={require("../img/parking.png")}
                                style={{ width: 30, height: 40 }}
                            />
                        </Marker>
                    ))
                }
            </MapView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
                onPress={onCenter}
            >
                <Image source={require("../img/crntbtn.png")}
                style={{height:80,width:80}} />
            </TouchableOpacity>


            {!mapRoute ? (
                <View style={{ flex: 1 }}>
                    <ListPages
                        provideloc={curLoc}
                        PlaceLoc={information}
                        funcformodalopen={setModalforlist}
                    />
                </View>) : null
            }
            {mapRoute && crnt_distance ? (
                <View style={{ padding: 20, alignItems: "center" }}>
                    <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>Distancce</Text>
                    <Text style={{ fontSize: 35, textAlign: "center", fontWeight: "bold" }}>{crnt_distance} meter</Text>
                </View>) : null
            }


            {
                cnclBtn ? (
                    <View>
                        <CustomBtn
                            btnText="Cancle"
                            onPress={cancleRoute}
                            btnStyle={{ backgroundColor: COLOR.Blue_Gray, marginTop: 20 }}
                        />
                    </View>
                ) : null
            }

            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MODAL
                    value={data}
                    close_btn={modal_close_btn}
                    confirm_btn={modal_confirm_btn}
                    routedistance={routeDistance}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({})


