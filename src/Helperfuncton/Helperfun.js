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
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        )
    })
    

//{ enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }

/* export const locationPermission =()=> new Promise(async (resolve,reject)=> {
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
}) */
export const locationPermission = () => new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
        try {
            const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
            if (permissionStatus === 'granted') {
                return resolve("granted");
            }
            reject('Permission not granted');
        } catch (error) {
            return reject(error);
        }
    }
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve("granted");
        }
        return reject('Location Permission denied');
    }).catch((error) => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
    });
});


// name validation

export const isValidUsername = (username) => {
    // Use a regular expression to check if the username contains only letters and white spaces
    const regex = /^[a-zA-Z\s]+$/;
  
    // Test the username against the regular expression
    return regex.test(username);
};

  
// email validation
 /*  export const isValidEmail = (email) => {
    // Use a regular expression to check if the email has a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regular expression
    return emailRegex.test(email);
  }; */


  export const isValidEmail = (email) => {
    // List of allowed email domains
    const allowedDomains = [
      'gmail.com',
      'yahoo.com',
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [, domain] = email.split('@');

    return allowedDomains.includes(domain) && emailRegex.test(email);
  };

 
  export const isValidAmount = (amount) => {
    // Use a regular expression to check if the amount is a positive integer without leading zeros
    const regex = /^[1-9]\d*$/;
  
    // Test the amount against the regular expression
    return regex.test(amount);
};



  
  
  
 
  


