import React, {memo} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CommonHeader = ({
  title,
  leftIcon,
  rightIcon,
  onPressLeft,
  onPressRight,
}: any) => {
  const {top} = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
          height: top + 60,
        },
      ]}>
      
      {/* Left Section */}
      <View style={styles.leftContainer}>

        {leftIcon && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressLeft}
            style={styles.iconButton}>
            
            {/* {leftIcon} */}
            <Text>{"<-"}</Text>
          </TouchableOpacity>
        )}

        <Text
          numberOfLines={1}
          style={styles.title}>
          
          {title}
        </Text>

      </View>

      {/* Right Section */}
      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressRight}
            style={styles.iconButton}>
            
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
};

export default memo(CommonHeader);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,

    elevation: 3,
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  rightContainer: {
    marginLeft: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',

    marginLeft: 10,
    flexShrink: 1,
  },

  iconButton: {
    width: 36,
    height: 36,

    borderRadius: 18,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F5F5F5',
  },
});