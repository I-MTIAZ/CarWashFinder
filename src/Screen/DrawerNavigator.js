// Drawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Welcome } from './Welcome';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Welcome" component={Welcome} />
    </Drawer.Navigator>
  );
};
