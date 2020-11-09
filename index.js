/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import handlequit from './handlequit';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('ReactNativeFirebaseMessagingHeadlessTask', () =>
  require('./handlequit').default
);