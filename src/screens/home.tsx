import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AnimatedTextField from '../components/AnimatedTextField';
// import {RamData} from '../components/ramdata';
import {NativeFunction} from '../utils/NativeModule';
import Grafana from 'react-native-grafana';

export const HomeScreen: React.FC = () => {
  const [data, setData] = useState('');
  const a = async () => {
    console.warn('await');

    Grafana.init({
      uri: 'https://grafana.netstratum.com/loki/api/v1/push',
      sessionId: 2,
    });
  };
  a();

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      {/* <RamData /> */}
      <AnimatedTextField
        value={data.toString()}
        onChangeText={(text: any) => setData(text)}
        placeHolderBGColor="#000"
        width={100}
        textColor={'#fff'}
        placeholder={'Limit'}
        placeholderTextColor={'#fff'}
        isvalid={true}
        keyboardType="decimal-pad"
      />
      <TouchableOpacity
        onPress={() => {
          console.warn(data);
          NativeFunction.setThreshold(
            Math.floor(Number(data)).toString(),
            'MB',
          );
        }}
        style={styles.btn}
        activeOpacity={0.2}>
        <Text>set</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {flex: 1, backgroundColor: '#000', alignItems: 'center'},
  btn: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#2d2c2c',
    borderRadius: 5,
  },
});
let a = [
  {mem: 0, pid: 1001, processName: 'com.mediatek.ims'},
  {mem: 0, pid: 1001, processName: 'com.mediatek.ims'},
  {mem: 0, pid: 1001, processName: 'com.android.phone'},
  {mem: 0, pid: 1000, processName: 'com.android.dynsystem'},
  {mem: 0, pid: 10129, processName: 'com.mediatek.camera'},
  {mem: 0, pid: 10058, processName: 'com.android.providers.calendar'},
  {mem: 0, pid: 1001, processName: 'com.android.phone'},
  {mem: 0, pid: 10054, processName: 'android.process.media'},
  {
    mem: 0,
    pid: 10092,
    processName: 'com.android.networkstack.tethering.overlay',
  },
  {mem: 0, pid: 1000, processName: 'system'},
  {mem: 0, pid: 10123, processName: 'com.android.wallpapercropper'},
  {mem: 0, pid: 10045, processName: 'com.mediatek.SettingsProviderResOverlay'},
  {mem: 0, pid: 10049, processName: 'com.mediatek.systemuiresoverlay'},
  {
    mem: 0,
    pid: 10097,
    processName: 'com.android.networkstack.tethering.inprocess.overlay',
  },
  {mem: 0, pid: 10048, processName: 'com.android.wifi.resources.overlay'},
  {mem: 0, pid: 10055, processName: 'com.android.documentsui'},
  {mem: 0, pid: 10051, processName: 'com.android.externalstorage'},
  {mem: 0, pid: 1000, processName: 'com.mediatek.simprocessor'},
  {mem: 0, pid: 10085, processName: 'com.android.companiondevicemanager'},
  {mem: 0, pid: 1001, processName: 'com.android.phone'},
  {mem: 0, pid: 10054, processName: 'android.process.media'},
  {
    mem: 0,
    pid: 10093,
    processName: 'com.google.android.networkstack.tethering.overlay',
  },
  {mem: 0, pid: 10053, processName: 'com.mediatek.engineermode'},
  {mem: 0, pid: 1000, processName: 'com.mediatek.omacp'},
  {
    mem: 0,
    pid: 10096,
    processName: 'com.android.networkstack.inprocess.overlay',
  },
  {
    mem: 0,
    pid: 10025,
    processName: 'com.android.theme.icon_pack.circular.themepicker',
  },
  {mem: 0, pid: 10054, processName: 'android.process.media'},
  {mem: 0, pid: 10104, processName: 'com.android.vending'},
  {mem: 0, pid: 10087, processName: 'com.android.pacprocessor'},
  {mem: 0, pid: 10068, processName: 'com.android.simappdialog'},
  {mem: 0, pid: 1073, processName: 'com.android.networkstack.process'},
  {mem: 0, pid: 10094, processName: 'com.android.networkstack.overlay'},
  {mem: 0, pid: 10072, processName: 'com.android.certinstaller'},
  {mem: 0, pid: 10124, processName: 'com.android.carrierconfig'},
  {mem: 0, pid: 1000, processName: 'system'},
  {mem: 0, pid: 10069, processName: 'com.android.egg'},
  {mem: 0, pid: 10054, processName: 'android.process.media'},
  {mem: 0, pid: 1027, processName: 'com.android.nfc'},
  {mem: 0, pid: 1001, processName: 'com.android.phone'},
  {mem: 0, pid: 1001, processName: 'com.android.phone'},
  {mem: 0, pid: 10065, processName: 'com.android.backupconfirm'},
  {mem: 0, pid: 10118, processName: 'com.android.provision'},
  {mem: 0, pid: 10077, processName: 'com.mediatek.mdmlsample'},
  {mem: 0, pid: 1001, processName: 'com.mediatek.smartratswitch'},
  {mem: 0, pid: 10128, processName: 'com.android.calendar'},
  {mem: 0, pid: 10047, processName: 'com.mediatek.frameworkresoverlay'},
  {mem: 0, pid: 10083, processName: 'com.debug.loggerui'},
  {mem: 0, pid: 1000, processName: 'system'},
  {mem: 0, pid: 10066, processName: 'com.android.sharedstoragebackup'},
  {mem: 0, pid: 10078, processName: 'com.mediatek.batterywarning'},
  {mem: 0, pid: 1068, processName: 'com.android.se'},
  {mem: 0, pid: 1000, processName: 'system'},
  {mem: 0, pid: 10101, processName: 'com.google.android.apps.wellbeing'},
  {mem: 0, pid: 1000, processName: 'com.mediatek'},
  {mem: 0, pid: 10121, processName: 'com.mediatek.duraspeed'},
  {mem: 0, pid: 1000, processName: 'com.hibory.hideapp'},
  {mem: 0, pid: 10052, processName: 'com.android.cellbroadcastreceiver'},
  {mem: 0, pid: 10113, processName: 'com.google.android.webview'},
  {mem: 0, pid: 1000, processName: 'system'},
  {mem: 0, pid: 1073, processName: 'com.android.networkstack.process'},
  {
    mem: 0,
    pid: 10002,
    processName: 'com.android.theme.icon_pack.rounded.themepicker',
  },
  {mem: 0, pid: 1000, processName: 'com.android.keychain'},
  {mem: 0, pid: 10061, processName: 'com.google.android.packageinstaller'},
  {mem: 0, pid: 10105, processName: 'com.google.android.gms'},
  {mem: 0, pid: 10105, processName: 'com.google.process.gapps'},
  {mem: 0, pid: 10109, processName: 'com.google.android.tts'},
  {mem: 0, pid: 10131, processName: 'android.ext.services'},
  {mem: 0, pid: 10108, processName: 'com.google.android.gmsintegration'},
  {mem: 0, pid: 10050, processName: 'com.android.calllogbackup'},
  {mem: 0, pid: 1000, processName: 'com.android.localtransport'},
  {mem: 0, pid: 10088, processName: 'com.android.carrierdefaultapp'},
  {mem: 0, pid: 10056, processName: 'com.android.proxyhandler'},
  {mem: 0, pid: 10060, processName: 'com.android.managedprovisioning'},
  {mem: 0, pid: 1073, processName: 'com.android.networkstack.process'},
  {mem: 0, pid: 10054, processName: 'com.android.soundpicker'},
  {mem: 0, pid: 1001, processName: 'com.android.phone'},
  {mem: 0, pid: 10086, processName: 'com.android.wallpaper.livepicker'},
  {mem: 0, pid: 10071, processName: 'com.mediatek.gnssdebugreport'},
  {mem: 0, pid: 1000, processName: 'com.android.settings'},
  {mem: 0, pid: 10095, processName: 'com.google.android.networkstack.overlay'},
  {mem: 0, pid: 10142, processName: 'com.stdapp'},
  {mem: 0, pid: 1073, processName: 'com.android.networkstack.permissionconfig'},
  {mem: 0, pid: 10079, processName: 'com.mediatek.mdmconfig'},
  {mem: 0, pid: 10081, processName: 'com.mediatek.lbs.em2.ui'},
  {mem: 0, pid: 10057, processName: 'com.android.vpndialogs'},
  {mem: 0, pid: 10130, processName: 'com.android.email'},
  {mem: 0, pid: 1001, processName: 'com.android.phone'},
  {mem: 0, pid: 2000, processName: 'com.android.shell'},
  {
    mem: 0,
    pid: 10028,
    processName: 'com.android.theme.icon_pack.filled.themepicker',
  },
  {mem: 0, pid: 1000, processName: 'system'},
  {mem: 0, pid: 10050, processName: 'android.process.acore'},
  {mem: 0, pid: 10050, processName: 'android.process.acore'},
  {mem: 0, pid: 10135, processName: 'com.android.providers.media.module'},
  {mem: 0, pid: 10125, processName: 'com.android.emergency'},
  {mem: 0, pid: 1000, processName: 'system'},
  {mem: 0, pid: 1000, processName: 'com.android.deskclock'},
  {mem: 0, pid: 10122, processName: 'com.android.systemui'},
  {mem: 0, pid: 10074, processName: 'com.android.bluetoothmidiservice'},
  {mem: 0, pid: 10134, processName: 'com.android.permissioncontroller'},
  {mem: 0, pid: 10091, processName: 'com.android.traceur'},
  {mem: 0, pid: 1002, processName: 'com.android.bluetooth'},
  {mem: 0, pid: 10050, processName: 'android.process.acore'},
  {mem: 0, pid: 1000, processName: 'com.wapi.wapicertmanager'},
];
