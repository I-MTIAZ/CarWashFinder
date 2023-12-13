import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Platform,Alert } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import { useState, useRef, useEffect } from 'react';
import { locationPermission, getCurrentLocation } from '../Helperfuncton/Helperfun'
import { MODAL } from './MODAL';
import CustomBtn from './CustomBtn';
import { Google_API } from '../Constrains/GoogleApi'
import { COLOR } from '../Constrains/COLOR';
import { ListPages } from './ListPages';
import { Review } from './Review';
import * as Keychain from "react-native-keychain";


const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export const MapPage = (props) => {
    const mapRef = useRef()
    const markerRef = useRef()
    //console.log(props.route.params.data)
    //username in credintials
    const credentials = props.route.params.data

    //console.log("in map checking => ",credentials);


    //set review
    const [review, setreview] = useState(false)

    const information = props.route.params.destlocation
    //console.log(information)

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

    const { curLoc, destinationCords, coordinate } = state

    //get live location every 5 second
    const [locCall, setlocCall] = useState(false)

    /* useEffect(() => {
       const timeoutId = setTimeout(() => {
           setreview(true);
           console.log(savea_Place);
       }, 15000); // 15 seconds in milliseconds
 
       // Clear the timeout if the component unmounts before the 15 seconds
       return () => clearTimeout(timeoutId);
   }, []); */



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
                animate(latitude, longitude)
                const point_A = {
                    latitude: latitude,
                    longitude: longitude
                }
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

                    const dist = await getDistanceAndDuration(point_A, savea_Place)
                    //console.log("==============", dist.distance)
                    set_crnt_distace(dist.distance)
                    if (dist.distance < 15) {
                        console.log("i am distance == ", dist.distance);
                      
                        // Set a timeout to trigger setReview(true) after 15 seconds
                        const timeoutId = setTimeout(() => {
                          setreview(true);
                          cancleRoute()
                        }, 15000);
                      
                        // Clear the timeout if the component unmounts or if distance becomes >= 5 before 15 seconds
                        return () => clearTimeout(timeoutId);
                      }
                        
                }
            }

        } catch (error) {
            // Handle the error or rejection here
            //console.error("Error getting location permission:", error);
            Alert.alert(
                'Error getting location permission',
                 error,
                [{ text: 'OK', onPress: getLiveLocation }]
                
              );
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



    // console.log("Current distance------------------>", crnt_distance)

    // save a place's latitude and longitude
    const [savea_Place, setSaveaPlace] = useState({})

    //save current location for smooth direction
    const [save_curloc, setsave_curloc] = useState({})

    //marker ref
    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 4000);
            }
        } else {
            curLoc.timing(newCoordinate).start();
        }
    }


    // for mapref start for first time

    /*   useEffect(() => {
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


        // save current location
        setSaveaPlace(val)

        setsave_curloc(curLoc)

        setrouteDistance({ dist: val.distance, duration: val.duration })
        //console.log("======value======\n", val)

        setSate({
            ...state,
            destinationCords: {
                latitude: val.latitudes,
                longitude: val.longitudes
            }
        })

    }

    // saving the duration and destionton for each place/ destination 

    const [placesInfo, setPlacesInfo] = useState({});
    useEffect(() => {
        if (curLoc.latitude && curLoc.longitude) {
            const data = information.map(async (item) => {
                return {
                    info: await getDistanceAndDuration(curLoc, item),
                    titles: item.titles,
                    latitudes: item.latitudes,
                    longitudes: item.longitudes,
                    review: item.review
                };
            });

            // Use Promise.all to wait for all asynchronous operations to complete
            Promise.all(data).then((result) => {

                setPlacesInfo(result)

            });
        }

    }, [curLoc]);


    //console.log(placesInfo)

    //set modal
    const setModal = (val) => {
        // modal visualization if true
        setdata(true)

        //val = destination location
        // console.log("destination ====", val)

        // save current location
        setsave_curloc(curLoc)


        //Save a place's info
        setSaveaPlace(val)

        let matchingIndex = -1; // Initialize matchingIndex to -1 if no match is found
        const searchResult = placesInfo.some((place, index) => {
            if (place.titles === val.titles) {
                matchingIndex = index; // Update matchingIndex when a match is found
                return true; // Stop iterating when a match is found
            }
            return false;
        });

        // Use matchingIndex as needed
        if (searchResult) {
            console.log('Match found at index:', matchingIndex);
        } else {
            console.log('No match found.');
        }

        //save distance 
        setrouteDistance({
            dist: placesInfo[matchingIndex].info.distance,
            duration: placesInfo[matchingIndex].info.duration
        })

        // console.log("distance ====", distanceInMeters);

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
        // console.log("value ===>>>> ", val)
        setdata(val)
    }

    // fetch modal confirm button info from modal.js
    const modal_confirm_btn = (val) => {
        // val = true
        // console.log("route info", val)
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

    // get distance and duration for a destination

    const getDistanceAndDuration = async (origin, destination) => {
        const originCoordinates = `${origin.latitude},${origin.longitude}`;
        const destinationCoordinates = `${destination.latitudes},${destination.longitudes}`;
        const API_KEY = Google_API; // Replace with your actual API key

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originCoordinates}&destinations=${destinationCoordinates}&key=${API_KEY}`
            );
            const data = await response.json();

            if (data.status === 'OK' && data.rows.length > 0 && data.rows[0].elements.length > 0) {

                const distance = parseFloat(data.rows[0].elements[0].distance.value); // distance in meters
                const duration = parseInt(data.rows[0].elements[0].duration.value / 60); // duration in minutes

                //console.log('Distance:', distance);
                //console.log('Duration:', duration);
                return { distance, duration }

                // You can set these values in your state or perform any other actions with them
            } else {
                console.error('Error fetching distance and duration:', data.status);
                return { distance: 0, duration: 0 }; // Return default values or handle the error
            }
        } catch (error) {
            console.error('Error fetching distance and duration:', error);
        }
    };

    const review_close_btn = (val) => {
        setreview(val)
    }




    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ height: mapRoute ? '60%' : '50%', width: '100%', marginBottom: 15 }}
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
                                //console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
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
                            onPress={() => {
                                if (!cnclBtn) {
                                    setModal(item)
                                }

                            }}
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
                    style={{ height: 80, width: 80 }} />
            </TouchableOpacity>


            {!mapRoute ? (
                <View style={{ flex: 1 }}>
                    <ListPages
                        provideinfo={placesInfo}
                        funcformodalopen={setModalforlist}

                    />
                </View>) : null
            }
            {/* {
                placesInfo ? (
                    <View>
                        {
                            Object.keys(placesInfo).map((key, index) => (
                                <View key={index}>
                                    <Text>{placesInfo[key].titles}</Text>
                                    <Text>Distance: {placesInfo[key].info.distance}</Text>
                                    <Text>Duration: {placesInfo[key].info.duration}</Text>
                                </View>
                            ))
                        }
                    </View>
                ) : null
            } */}


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
                    locationame={savea_Place.titles}
                    star={savea_Place.review}
                    pp={props}
                />
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Review
                    value={review}
                    close_btn={review_close_btn}
                    location={savea_Place}
                    username={credentials}

                />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({})


