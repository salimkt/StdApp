import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import BackgroundTimer from 'react-native-background-timer';
import { NativeFunction } from '../utils/NativeModule';
import { useEffect, useState } from 'react';
import AnimatedTextField from './AnimatedTextField';
let interval: any;
export const RamData = () => {
  const [progress, setProgress] = useState([1, 0, 0]);


  //   console.warn(progress[1] / progress[0]);
  useEffect(() => {
    const a = async () => {
      BackgroundTimer.clearInterval(interval);
      interval = BackgroundTimer.setInterval(async () => {
        setProgress(JSON.parse(await NativeFunction?.checkRam()));
      }, 3000);
      return () => {
        BackgroundTimer.clearInterval(interval);
      };
    };
    a();
  }, []);
  return (
    <View style={styles.progressview}>
      <Progress.Circle
        progress={progress[1] / progress[0]}
        borderWidth={0}
        animated
        style={{ alignItems: 'center', justifyContent: 'center' }}
        size={150}
        indeterminate={false}>
        <Text style={styles.data}>
          {Math.floor(progress[1]) + '/' + Math.floor(progress[0])}
        </Text>
      </Progress.Circle>
    </View>
  );
};

const styles = StyleSheet.create({
  progressview: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#0f0f0f',
    borderRadius: 10,
    marginTop: 100,
    elevation: 10,
    shadowColor: '#fff',
  },
  data: { position: 'absolute', fontWeight: '700', color: '#fff' },
});
