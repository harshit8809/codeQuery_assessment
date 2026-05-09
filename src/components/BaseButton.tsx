// BaseButton.tsx

import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface BaseButtonProps extends TouchableOpacityProps {
  title: string;

  onPress: (event: GestureResponderEvent) => void;

  isLoading?: boolean;
  disabled?: boolean;

  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;

  loaderColor?: string;
}

const BaseButton = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,

  containerStyle,
  textStyle,

  leftComponent,
  rightComponent,

  loaderColor = '#fff',

  ...rest
}: BaseButtonProps) => {
  const isButtonDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isButtonDisabled}
      style={[
        styles.button,
        isButtonDisabled && styles.disabledButton,
        containerStyle,
      ]}
      {...rest}>

      {isLoading ? (
        <ActivityIndicator color={loaderColor} />
      ) : (
        <>
          {leftComponent}

          <Text style={[styles.buttonText, textStyle]}>
            {title}
          </Text>

          {rightComponent}
        </>
      )}
    </TouchableOpacity>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});