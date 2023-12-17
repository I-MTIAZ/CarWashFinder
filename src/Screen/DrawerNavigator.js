// Drawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Start } from './Start';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = (props) => {
  console.log(props.route.params)
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="START" options={{ title: '' }}>
        {() => <Start {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
