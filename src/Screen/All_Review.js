import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, ActivityIndicator,Alert } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { DataBase } from '../Constrains/GoogleApi';



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
    <ScrollView style={{ flex: 1, backgroundColor: "#E6E6E7" }}>
      <View >
        {reviews ? (
          reviews.map((item, index) => (
            <View key={index} style={styles.container}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  source={require("../img/user.png")}
                  style={{ width: 35, height: 35 }}
                />
                <Text style={styles.h_txt}>{item.username}</Text>
              </View>

              <AirbnbRating
                count={5}
                reviews={["Bad", "OK", "Good", "Very Good", "Amazing"]}
                defaultRating={item.star}
                size={25}
                starImage={require('../img/ratt.jpg')}
                selectedColor="orange"
                showRating={false}
                isDisabled={true}
                ratingContainerStyle={styles.rev_display}
              />
              <Text style={{}}>{item.date}</Text>
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

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#FDFDFE",
    marginVertical: 5
  },
  h_txt: {
    fontSize: 19,
    fontWeight: "bold",
    padding: 8,
  },
  p_txt: {
    fontSize: 18,
  },
  rev_display: {
    alignSelf: "flex-start",
    margin: 0,
    padding: 0
  }

})

