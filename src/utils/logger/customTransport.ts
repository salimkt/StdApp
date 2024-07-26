import axios from 'axios';
import {LogEntry} from './loggerType';
import {Platform} from 'react-native';
import {
  // consoleTransport,
  transportFunctionType,
  //  transportFunctionType
} from 'react-native-logs';
import {getDate} from '../utils';
import DeviceInfo from 'react-native-grafana';

const customTransport: transportFunctionType = data => {
  try {
    (async () => {
      const epochMilliseconds = Date.now();
      const logData = JSON.parse(data.rawMsg);
      const epochNanoseconds = epochMilliseconds * 1000000;
      const obj: LogEntry = {
        message: logData.message,
        time: new Date().toTimeString(),
        user: 'MOBILE_SDk',
        user_id: logData.id,
        platform: Platform.OS,
        platform_version: DeviceInfo.getSystemVersion() ?? '',
        brand: DeviceInfo.getBrand() ?? '',
        fontscale: await DeviceInfo.getFontScale()
          .then(scale => {
            return scale?.toString();
          })
          .catch(() => {
            return '';
          }),
        deviceName: await DeviceInfo.getDeviceName()
          .then(name => {
            return name;
          })
          .catch(() => {
            return '';
          }),
        install_time: await DeviceInfo.getFirstInstallTime()
          .then(time => {
            return getDate(time);
          })
          .catch(() => {
            return '';
          }),
        update_time: await DeviceInfo.getLastUpdateTime()
          .then(time => {
            return getDate(time);
          })
          .catch(() => {
            return '';
          }),
      };

      let formattedString = '';

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          formattedString += `${key}=${obj[key as keyof LogEntry]} `;
        }
      }
      pushLogs(formattedString, epochNanoseconds);
    })();
  } catch (e) {
    console.warn('console_Error_JS', e);
  }
};

const pushLogs = (message: string, epochNanoseconds: number) => {
  axios
    .post('https://grafana.netstratum.com/loki/api/v1/push', {
      streams: [
        {
          stream: {
            app: 'frontend',
          },
          values: [[epochNanoseconds.toString(), message]],
        },
      ],
    })
    .then(() => {})
    .catch(() => {
      setTimeout(() => {
        pushLogs(message, epochNanoseconds);
      }, 1000);
    });
};

const LoggerConfig = {
  transport: customTransport,
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  // transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      debug: 'green',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

export {LoggerConfig, pushLogs};
