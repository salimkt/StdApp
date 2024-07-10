/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import LogRocket from '@logrocket/react-native';

// add logrocket '<APP_SLUG>' here
// LogRocket.init('40ii7i/osl')

AppRegistry.registerComponent(appName, () => App);
