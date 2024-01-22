import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Alert, Dimensions,SafeAreaView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { DataBase } from '../Constrains/GoogleApi';
const { height } = Dimensions.get("window");
import { Colorf } from '../Constrains/COLOR';



export const All_Review = ({ locationname }) => {
  const [reviews, setReviews] = useState()
  const location_name = locationname
  useEffect(() => {
    // Fetch data when the component mounts
    if (location_name) {
      axios
        .get(`${DataBase}/all_reviews`, {
          params: {
            location_name: location_name, // replace with the actual location name
          },
        })
        .then((response) => {
          const Allreview = response.data.map((location) => {
            // Convert the raw date to a JavaScript Date object
            const date = new Date(location.date_time);

            // Format the date as "2023-11-26"
            const formattedDate = date.toISOString().split('T')[0];

            // Format the date as "November 26, 2023"
            const formattedLongDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return {
              username: location.username,
              comment: location.comment,
              star: location.star,
              date: formattedLongDate, // or formattedLongDate based on your preference
            };
          });

          setReviews(Allreview)

        })
        .catch((error) => {
          Alert.alert('Error fetching location review data:', error);
          if (error.response) {
            console.log('Response data in error:', error.response.data);
          } else if (error.request) {
            console.log('Request data in error:', error.request);
          } else {
            console.log('Other error:', error.message);
          }
        });
    }
  }, [location_name]); // Include location_name in the dependency array if it's a variable from the component's scope
  console.log(reviews);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '2%' : 0 }}>
      <ScrollView style={{ flex: 1, backgroundColor: Colorf.b }}>
        <View >
          {reviews ? (
            reviews.map((item, index) => (
              <View key={index} style={styles.container}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Image
                    source={require("../img/user.png")}
                    style={{ width: height/20, height: height/20 }}
                    tintColor={Colorf.c}
                  />
                  <Text style={styles.h_txt}>{item.username}</Text>
                </View>

                <AirbnbRating
                  count={5}
                  defaultRating={item.star}
                  size={height/30}
                  starImage={require('../img/ratt.jpg')}
                  selectedColor="black"
                  showRating={false}
                  isDisabled={true}
                  ratingContainerStyle={styles.rev_display}
                />
                <Text style={{color:Colorf.c}}>{item.date}</Text>
                <Text style={styles.p_txt}>{item.comment}</Text>

              </View>
            ))
          ) : (
            <View>
              <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={styles.spinnerText}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: height/45,
    backgroundColor: "white",
    marginVertical: '1.5%'
  },
  h_txt: {
    fontSize: height/40,
    fontWeight: "bold",
    padding: height/90,
    color:Colorf.c
  },
  p_txt: {
    fontSize: height/40,
    fontWeight:'400',
    color:Colorf.c
  },
  rev_display: {
    alignSelf: "flex-start",
    margin: 0,
    padding: 0
  }

})

