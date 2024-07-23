/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  NativeEventEmitter,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NativeFunction } from './utils/NativeModule';
import ErrorBoundary from 'react-native-error-boundary';
import axios from 'axios';




type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const CustomFallback = (props: { error: Error, resetError: Function }) => {
  console.log("Error-------", props.error)
  return (<View>
    <Text>Something happened!</Text>
    <Text>{props.error.toString()}</Text>
    <Button onPress={() => props.resetError} title={'Try again'} />
  </View>
  )
}

export const setJSExceptionHandler = (customHandler: any, allowedInDevMode = false) => {

  const globalAny: any = global;
  if (typeof allowedInDevMode !== "boolean" || typeof customHandler !== "function") {
    console.log("setJSExceptionHandler is called with wrong argument types.. first argument should be callback function and second argument is optional should be a boolean");
    console.log("Not setting the JS handler .. please fix setJSExceptionHandler call");
    return;
  }
  const allowed = allowedInDevMode ? true : true;
  if (allowed) {
    globalAny.ErrorUtils.setGlobalHandler(customHandler);
  } else {
    console.log("Skipping setJSExceptionHandler: Reason: In DEV mode and allowedInDevMode = false");
  }
};



function App(): React.JSX.Element {



  let ws: any;

  function connectWebSocket() {
    ws = new WebSocket("ws://192.168.1.12:8080");

    ws.onopen = function () {
      console.log("open-------------")
    };

    ws.onmessage = function (event: any) {
      console.log("data", event.data)
    };

    ws.onclose = function () {
      console.log("close-------------")
    }
  }

  function sendMessage() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = "Hello Server";
      ws.send(message);
      console.log("Message-----", message)
    }
  }

  function closeConnection() {
    if (ws) {
      ws.close();
    }
  }




  const startHandler = () => {
    sendMessage();
  }

  const stopHandler = () => {
    closeConnection();
  }



  // socket.onopen = (event: any) => {
  //   console.log("Event--", event)
  //   socket.send("Here's some text that the server is urgently awaiting!");
  // };





  // (async () => {
  //   axios.interceptors.request.use(
  //     function (req: any) {
  //       req.time = { startTime: new Date() };
  //       console.log("CHECK----AXIOS--req", req)
  //       return req;
  //     },
  //     (err: any) => {
  //       console.log("CHECK----AXIOS--err", err)
  //       return Promise.reject(err);
  //     }
  //   );

  //   axios.interceptors.response.use(
  //     function (res: any) {
  //       console.log("CHECK----AXIOS--res", res)
  //       res.config.time.endTime = new Date();
  //       res.duration =
  //         res.config.time.endTime - res.config.time.startTime;
  //       return res;
  //     },
  //     (err: any) => {
  //       console.log("CHECK----AXIOS--err", err)
  //       return Promise.reject(err);
  //     }
  //   );


  //})();

  // const startHandler = () => {
  //   testEmitter.emit('clickHandler', 1.1)
  //   //axios.test();
  //   // axios
  //   //   .get("https://dummy.restapiexample.com/api/v1/employees")
  //   //   .then((res: any) => {
  //   //     console.log(res.duration)
  //   //   })
  //   //   .catch((err: any) => {
  //   //     console.log(err);
  //   //   });
  // }

  // const stopHandler = () => {
  //   testEmitter.emit('clickHandler', 1.2)
  //   //axios.test2();
  //   // axios
  //   //   .get("https://dummy.restapiexample.com/api/v1/employees")
  //   //   .then((res: any) => {
  //   //     console.log(res.duration)
  //   //   })
  //   //   .catch((err: any) => {
  //   //     console.log(err);
  //   //   });
  // }

  const exceptionhandler = (error: any, isFatal: any) => {
    // your error handler function
    console.log("ERROR--------111", error)
  };

  setJSExceptionHandler(exceptionhandler, true);


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //NativeFunction.stopMonitoring();
  const a: any = {}
  return (
    <ErrorBoundary FallbackComponent={CustomFallback} onError={() => { console.log("Hi error") }}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <TouchableOpacity style={styles.touch} onPress={startHandler}>
              <Text style={styles.touchText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={stopHandler}>
              <Text style={styles.touchText}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={connectWebSocket}>
              <Text style={styles.touchText}>connect</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  touch: { backgroundColor: "#dddddd", padding: 10, margin: 10, alignSelf: 'center' },
  touchText: {
    fontSize: 22
  },
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
