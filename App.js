
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Start } from './src/Screen/Start'
import { MapPage } from './src/Screen/MapPage'
import { ListPages } from './src/Screen/ListPages'
import { Welcome } from './src/Screen/Welcome';
import { Login } from './src/Screen/Login';
import { Registration } from './src/Screen/Registration';


const Stack = createNativeStackNavigator();
import { LogBox } from 'react-native';


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name='WELCOME'
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name='LOGIN' component={Login} options={{
          headerShown: false
        }} />
        <Stack.Screen name='REGIST' component={Registration} options={{
          headerShown: false
        }} /> */}
        <Stack.Screen name='START' component={Start} />
        <Stack.Screen name='MAP' component={MapPage} options={{
            headerShown: false
          }}/>
        <Stack.Screen name='LIST' component={ListPages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
