import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = () =>
    new Promise((resolve,reject)=>{
        Geolocation.getCurrentPosition(
            position => {
                const cords ={
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                resolve(cords);
            },
            error =>{
                reject(error.message);
            },
            {enableHighAccuracy: false, timeout: 15000,maximumAge: 10000}
        )
    })



export const locationPermission =()=> new Promise(async (resolve,reject)=> {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then((granted) =>{
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
                resolve('granted');
            }
            return reject("location Permission denied");
        }).catch((error) => {
            console.log('Ask Location Permission error: ',error)
            return reject(error)
        });
})
