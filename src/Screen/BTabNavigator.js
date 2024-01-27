// Drawer.js
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Start } from './Start';
import { SETTINGS } from './SETTINGS';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Reward } from './Reward';
import { Colorf } from '../Constrains/COLOR';

const { height } = Dimensions.get("window");

const Tab = createBottomTabNavigator();




export const BTabNavigator = (props) => {
  //console.log(props.route.params)
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: height / 35,
          right: height / 35,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: height / 9,
          ...styles.shadow
        }

      }}
    >
      <Tab.Screen name="START" options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconcontainer}>
            <FontAwesome5 name="home" color={focused ? '#00674b' : '#748c94'}
              size={height / 25} />
            <Text style={{ color: focused ? '#00674b' : '#748c94' }}>Home</Text>
          </View>
        ),
        headerShown: false
      }}
      >
        {() => <Start {...props} />}
      </Tab.Screen>
      {/* { top: -30, height: 70, width: 70, borderRadius: 35,
                backgroundColor:"#991b1b"} */}
      <Tab.Screen name="Reward" options={{
        tabBarIcon: ({ focused }) => (
          <View
            style={[styles.iconcontainer, ]}
          >
            <FontAwesome5 name="trophy" color={focused ? '#00674b' : '#748c94'}
              size={height / 20} />
            <Text style={{ color: focused ? '#00674b' : '#748c94' }}>reward</Text>
          </View>
        ),
        headerShown: false,

      }}
      >
        {() => <Reward {...props} />}
      </Tab.Screen>

      <Tab.Screen name="SETTINGS" options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconcontainer}>
            <MaterialIcons name="settings" color={focused ? '#00674b' : '#748c94'}
              size={height / 25} />
            <Text style={{ color: focused ? '#00674b' : '#748c94' }}>Settings</Text>
          </View>
        ),
        headerShown: false
      }}
      >
        {() => <SETTINGS {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  iconcontainer: {
    alignItems: "center",
    justifyContent: "center",
  }
});