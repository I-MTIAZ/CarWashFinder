import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Platform, Alert, Linking,SafeAreaView } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';

import { useState, useRef, useEffect } from 'react';
import { locationPermission, getCurrentLocation } from '../Helperfuncton/Helperfun'
import { MODAL } from './MODAL';
import { Google_API } from '../Constrains/GoogleApi'
import { Review } from './Review';
import { ListPages } from './ListPages';
import { NETINFO } from "./NETINFO";
import { Colorf } from '../Constrains/COLOR';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const { height } = Dimensions.get("window");


export const TypeTwogMap = (props) => {

  const mapRef = useRef()
  const markerRef = useRef()
  //console.log(props.route.params.data)
  const credentials = props.route.params.data
  //console.log("credintial = ", credentials)


  //console.log("in map checking => ",credentials);

  //review
  const [review, setreview] = useState(false)



  const information = props.route.params.destlocation
  //console.log(information)

  

  const [state, setSate] = useState({
    // austria address 48.31864026223389, 14.278368460116216
    //bd address 22.332671112167628, 91.84030073971839
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





  const [locpermit, setlocpermit] = useState(false)
  // GET LIVE Location
  useEffect(() => {
    // Call getLiveLocation immediately when the component mounts
    const requestLocationPermission = async () => {
      const locPerssionDenied = await locationPermission()
      if (locPerssionDenied) {
        setlocpermit(locPerssionDenied)
      }
      else {
        console.log("error")
      }

    }
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    try {

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





  const onNetworkChange = (val) => {
    console.log("from map page check internet is active = ", val)
    if (val == false)
      props.navigation.navigate('START')
  }


  // save a place's latitude and longitude
  const [savea_Place, setSaveaPlace] = useState({})

  //save current location for smooth direction
  const [save_curloc, setsave_curloc] = useState({})

  //marker ref
  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 3000);
      }
    } else {
      curLoc.timing(newCoordinate).start();
    }
  }


  // for mapref start for first time

  useEffect(() => {
    const newCoords = {
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    };
    mapRef.current?.animateToRegion(newCoords, 5000);
  }, [curLoc]);
  const onCenter = () => {
    const newCoords = {
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    };
    mapRef.current?.animateToRegion(newCoords, 2000);

  }


  //set curlocatin to destination route  distance. Hold distance value

  const [routeDistance, setrouteDistance] = useState()


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

  const openGoogleMap = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;

    Linking.openURL(url).catch((err) => console.error('Error opening map:', err));
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

    openGoogleMap(savea_Place.latitudes, savea_Place.longitudes)
    //console.log(savea_Place.latitudes,savea_Place.longitudes)
    setdata(false)
    setreview(true)



  }
  //console.log("check Current distance show? ",curnt_dist_Show)


  //cancle button for route from current location to destination location


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
        console.log('Error fetching distance and duration:', data.status);
        return { distance: 0, duration: 0 }; // Return default values or handle the error
      }
    } catch (error) {
      console.log('Error fetching distance and duration:', error);
    }
  };


  /*  const onNetworkChange = (val)=>{
       console.log("from map page check internet is active = ",val)
       if(val == false) 
       props.navigation.navigate('START')
   } */




  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '0%' : 0 }}>
      <View style={{ flex: 1 }}>
        <NETINFO onNetworkChange={onNetworkChange} />
        <MapView style={{ height: '95%', width: '100%', }}
          initialRegion={curLoc}
          ref={mapRef}
        >


          <Marker.Animated
            ref={markerRef}
            coordinate={coordinate}
          >
            <Image
              source={require("../img/currentlocation.png")}
              style={{ width: height/9, height: height/9 }}
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
                  setModal(item)
                }}
              >
                <Image
                  source={require("../img/parking.png")}
                  style={{ width: height/18, height: height/18 }}
                  
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
            style={{ height: height/9, width: height/9}}
            tintColor={Colorf.c}
           
          />
          
        </TouchableOpacity>

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
            close_btn={(val) => setreview(val)}
            location={savea_Place}
            username={credentials}

          />
        </View>

        {!mapRoute ? (
          <View style={{ flex: 1 }}>
            <ListPages
              provideinfo={placesInfo}
              funcformodalopen={setModalforlist}
            />
          </View>) : null
        }

      </View >
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})


