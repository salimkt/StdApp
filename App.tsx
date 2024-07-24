/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef } from 'react';
import {
  AppState,
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
  Header,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import Grafana from 'react-native-grafana'

function App(): React.JSX.Element {

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    Grafana.init({ uri: "test", sessionId: 123 });
  }, [])

  const _handleAppStateChange = (nextAppState: any) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      Grafana.sendLog("10:2");
    } else {
      appState.current = nextAppState;
      Grafana.sendLog("10:1");
    }
  }

  useEffect(() => {
    const backgroundHandler = AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      backgroundHandler.remove();
    };

  }, [])


  const startHandler = () => {
    Grafana.sendLog("1:1:1");
  }

  const stopHandler = () => {
    Grafana.sendLog("1:1:2");
  }

  const makeError = () => {
    Grafana.sendLog("1:1:3");

    //undefined error- test() not defined
    Grafana.test();
  }

  (async () => {
    axios.interceptors.request.use(
      function (req: any) {
        req.time = { startTime: new Date() };
        console.log("CHECK----AXIOS--req", req)
        Grafana.sendLog("5:1");
        return req;
      },
      (err: any) => {
        Grafana.sendLog("5:2");
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      function (res: any) {
        Grafana.sendLog("5:3");
        res.config.time.endTime = new Date();
        res.duration =
          res.config.time.endTime - res.config.time.startTime;
        return res;
      },
      (err: any) => {
        Grafana.sendLog("5:4");
        console.log("CHECK----AXIOS--err", err)
        return Promise.reject(err);
      }
    );
  })();

  const apiCallHandler1 = () => {
    axios
      .get("https://dummy.restapiexample.com/api//employees")
      .then((res: any) => {
        console.log(res.duration)
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  const apiCallHandler2 = () => {
    axios
      .get("https://dummy.restapiexample.com/api/v1/employees")
      .then((res: any) => {
        console.log(res.duration)
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  const exceptionhandler: any = (error: any, isFatal: any) => {
    // your error handler function
    Grafana.sendLog(`8:1${error}`)
    console.log("ERROR--------111", error)
  };

  Grafana.setJSExceptionHandler(exceptionhandler, true);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //NativeFunction.stopMonitoring();
  const a: any = {}
  return (
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
          <TouchableOpacity style={styles.touch} onPress={makeError}>
            <Text style={styles.touchText}>Error</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={apiCallHandler2}>
            <Text style={styles.touchText}>Api call success</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={apiCallHandler1}>
            <Text style={styles.touchText}>Api call failed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

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
