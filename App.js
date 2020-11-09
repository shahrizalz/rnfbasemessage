// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PushNotification from "react-native-push-notification";

const Stack = createStackNavigator();
// const navigation = useNavigation()
function App() {

  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');
  const [date, setdate] = useState('')
  const [text, settext] = useState("")
  const num = 26;

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate('Message');
    goMessage()
    settext(remoteMessage.notification.body)
  });

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open


    

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });









    messaging().getToken().then(token => { console.log("Firebase token: ", token) })


  }, [])


  //react native push notification configure
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },



    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });


  const goMessage = ({navigation}) =>{
    navigation.navigate('Message')
  }

  const Home = ({ navigation }) => {
    return (
      <View>
        <Text style={styles.message}>Welcome Shah</Text>
        <Text style={styles.message}>Your Age is {num}</Text>
        <Text>Message is: {text}</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Message')}
        />
      </View>
    )
  }

  const Message = ({navigation}) => {
    return (
      <View>
        <Text style={styles.message}>Message page</Text>
        <Text style={styles.message}>Your Age is {num}</Text>
        <Text>Message is: {text}</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Message" component={Message} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  message: {
    alignSelf: 'center',

  }
})

export default App;