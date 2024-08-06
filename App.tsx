/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import Grafana from 'react-native-grafana';
import {
  NavigationAction,
  NavigationContainer,
  NavigationState,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const TestScreen1 = ({navigation}: any) => {
  const navigationHadler = () => {
    navigation.navigate('Home');
  };
  return (
    <View>
      <Text>TestScreen1</Text>
      <TouchableOpacity style={styles.touch} onPress={navigationHadler}>
        <Text style={styles.touchText}>{'<---Home Screen'}</Text>
      </TouchableOpacity>
    </View>
  );
};
const TestScreen2: any = ({navigation}: any) => {
  const navigationHadler = () => {
    TestScreen2.test();
    navigation.navigate('Homer');
  };
  return (
    <View>
      <Text>TestScreen1</Text>
      <TouchableOpacity style={styles.touch} onPress={navigationHadler}>
        <Text style={styles.touchText}>{'<---Home Screen'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({navigation}: any): React.JSX.Element => {
  useEffect(() => {
    Grafana.init({
      uri: 'https://nodejsws-pfnq.onrender.com',
      setexception: false,
    });
  }, []);

  const startHandler = () => {
    Grafana.sendLog({code: '1:1'});
  };

  const stopHandler = () => {
    Grafana.sendLog({code: '1:1'});
  };

  const makeError = () => {
    makeError.test();
    Grafana.sendLog({code: '1:2'});
    //undefined error- test() not defined
  };

  const navigationHadler1 = () => {
    navigation.navigate('Test1');
  };
  const navigationHadler2 = () => {
    navigation.navigate('Test2');
  };

  const navigationErrorHadler = () => {
    navigation.navigate('Test');
  };

  const apiCallHandler1 = () => {
    axios
      .get('https://dummy.restapiexample.com/api//employees')
      .then((res: any) => {
        console.log(res.duration);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const apiCallHandler2 = () => {
    axios
      .get('https://dummy.restapiexample.com/api/v1/employees')
      .then((res: any) => {
        console.log(res.duration);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //NativeFunction.stopMonitoring();
  const a: any = {};
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
          <TouchableOpacity style={styles.touch} onPress={navigationHadler1}>
            <Text style={styles.touchText}>{'Test Screen1 -->'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={navigationHadler2}>
            <Text style={styles.touchText}>{'Test Screen2 -->'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touch}
            onPress={navigationErrorHadler}>
            <Text style={styles.touchText}>{'Navigation error -->'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const App = () => {
  const stateChangeHandler = (state: NavigationState | undefined) => {
    console.log('State---', state);
    const routeData = JSON.stringify(state?.routes);
    Grafana.sendLog({code: '3:1', message: JSON.stringify(routeData)});
  };

  const navigationErrorHandler = (error: NavigationAction) => {
    console.log('Using Fallback-----', typeof error);
    Grafana.sendLog({code: '3:2', error: JSON.stringify(error)});
  };

  return (
    <NavigationContainer
      onStateChange={stateChangeHandler}
      onUnhandledAction={navigationErrorHandler}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test1" component={TestScreen1} />
        <Stack.Screen name="Test2" component={TestScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  touch: {
    backgroundColor: '#dddddd',
    padding: 10,
    margin: 10,
    alignSelf: 'center',
  },
  touchText: {
    fontSize: 22,
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
