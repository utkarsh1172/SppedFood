// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet
} from 'react-native';
import MainViewScreen from './screens/ViewScreen';
import AddNewScreen from './screens/AddNewScreen';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {

  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false
  };
  
  return (
    <Provider store={store} >
    <NavigationContainer style={{backgroundColor:'black'}}>
    <Stack.Navigator

      screenOptions={screenOptions}>
      
      <Stack.Screen name="MainView" component={MainViewScreen} />
      <Stack.Screen name="AddNew" component={AddNewScreen} />
    
    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
