import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
// import useTheme from '../../styles/useTheme';

interface textfieldType extends TextInputProps {
  // type:string,
  // setValidation:(state:any)=>{},
  // label:string,
  width: number;
  placeHolderBGColor: string;
  textColor: string;
  disabled?: boolean;
  isvalid?: boolean;
  maxlength?: number;
}
export default function AnimatedTextField({
  value,
  onChangeText,
  placeholder,
  multiline,
  width,
  placeHolderBGColor,
  textColor,
  disableFullscreenUI,
  disabled,
  isvalid,
  maxlength,
  secureTextEntry,
  keyboardType,
}: textfieldType) {
  // const theme = useTheme();
  const [inputHeight, setHeight]: any = useState(null);
  const [placeholderWidth, setWidth]: any = useState(null);
  const [focused, setFocused] = useState(false);
  const isFocused = useIsFocused();
  const inputRef: any = useRef(null);

  const animation = useRef(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 1.9],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 4],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.6],
  });
  const onFocus = () => {
    // console.log('On focus');
    // if (type != undefined && validation) {
    //   if (type == 'FirstName' && value == '') {
    //     setValidation({id: 1, msg: 'Please enter First Name'});
    //   } else if (type == 'LastName' && value == '') {
    //     setValidation({id: 2, msg: 'Please enter Last Name'});
    //   } else {
    //     if (isNaN(value)) {
    //       setValidation({id: 3, msg: 'The dial in id must be a Number'});
    //     }
    //     if (!isNaN(value) && value.length == 0) {
    //       setValidation({id: 5, msg: 'Please enter dial in id'});
    //     }
    //     if (!isNaN(value) && value.length != 10 && value.length != 0) {
    //       setValidation({
    //         id: 4,
    //         msg: 'The length of the dial in id must be 10 digits.',
    //       });
    //     }
    //   }
    // }
    setFocused(true);
    animate(1);
  };
  const onBlur = () => {
    !value && setFocused(false);
    !value && animate(0);
  };
  const animate = (val: any) => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (value) {
      // console.log('value', value);
      setTimeout(() => {
        setFocused(true);
        animate(1);
      });
    } else {
      !value && animate(0);
    }
  }, [isFocused, value]);

  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: disabled ? 'rgba(255,255,255,0.04)' : 'transparent',
          width: width,
          borderColor: !isvalid
            ? 'red'
            : disabled
              ? '#979797'
              : focused
                ? '#004675'
                : 'rgba(0, 0, 0, 0.50)',
        },
      ]}
      onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
      <View style={{ height: inputHeight, ...styles.placeholderContainer }}>
        <Animated.Text
          style={[
            styles.placeholder,
            {
              backgroundColor: placeHolderBGColor,
              transform: [{ translateY }, { translateX }, { scale }],
            },
          ]}
          onTextLayout={e =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }>
          {placeholder}
        </Animated.Text>
      </View>
      <TextInput
        editable={!disabled}
        ref={inputRef}
        style={[
          styles.input,
          {
            paddingVertical: 10,
            color: disabled ? '#979797' : textColor ? textColor : '#fff',
          },
          multiline && { height: 100, textAlignVertical: 'top' },
        ]}
        secureTextEntry={secureTextEntry}
        disableFullscreenUI={disableFullscreenUI}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxlength ?? undefined}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputContainer: {
    // height: 46,
    borderWidth: 1.5,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    // height: "100%",
    paddingHorizontal: 10,
    fontSize: 18,
  },
  placeholderContainer: {
    marginHorizontal: 5,
    position: 'absolute',
    justifyContent: 'center',
  },
  placeholder: {
    position: 'absolute',
    fontSize: 18,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 0,
    color: '#999',
  },
});
