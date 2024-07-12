import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { MenuProvider } from 'react-native-popup-menu';
import { navigationRef } from './utils/navigatecontrol';
// import {LoginScreen} from '../screens/login_screen';
// import {Header} from '../components/Header';
import { HomeScreen } from './screens/home';

const Stack = createNativeStackNavigator();
const options: NativeStackNavigationOptions = {
  animation: 'fade_from_bottom',
};
export const RootNavigation = () => {
  useEffect(() => {
    // initializeEvents();
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <MenuProvider>
        <Stack.Navigator screenOptions={options} initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </MenuProvider>
      {/* <AlertModal />
      <LoaderModal /> */}
    </NavigationContainer>
  );
};
