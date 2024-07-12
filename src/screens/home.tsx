import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AnimatedTextField from '../components/AnimatedTextField';
import { RamData } from '../components/ramdata';
import { NativeFunction } from '../utils/NativeModule';

export const HomeScreen: React.FC = () => {
  const [data, setData] = useState("");

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      <RamData />
      <AnimatedTextField
        value={data.toString()}
        onChangeText={(text: any) => setData(text)}
        placeHolderBGColor="#000"
        width={100}
        textColor={'#fff'}
        placeholder={"Limit"}
        placeholderTextColor={'#fff'}
        isvalid={true}
        keyboardType="decimal-pad"
      />
      <TouchableOpacity
        onPress={() => {
          console.warn(data);
          NativeFunction.setThreshold(data, "MB");
        }}
        style={styles.btn}
        activeOpacity={0.2}>
        <Text>set</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: { flex: 1, backgroundColor: '#000', alignItems: 'center' },
  btn: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#2d2c2c',
    borderRadius: 5,
  },
});
