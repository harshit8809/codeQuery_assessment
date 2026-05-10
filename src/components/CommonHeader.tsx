import React, { memo, useCallback } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ArrowLeft,
  LogOut,
  ShoppingCart,
} from 'lucide-react-native';

import { SCREENS } from '../constants/constant';

import { logout } from '../redux/slices/authSlice';
import HeaderActionButton from './HeaderActionButton';

interface CommonHeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
  showLogout?: boolean;
}

const CommonHeader = ({
  title,
  showBack = false,
  showCart = false,
  showLogout = false,
}: CommonHeaderProps) => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  const { top } = useSafeAreaInsets();

  const cartCount = useSelector(
    (state: any) =>
      state.cart.cartItems.length,
  );

  // Back Navigation
  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(SCREENS.HOME);
    }
  }, [navigation]);

  // Cart Navigation
  const handleCart = useCallback(() => {
    navigation.navigate(
      SCREENS.PRODUCT_CART,
    );
  }, [navigation]);

  // Logout
  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem(
      'token',
    );

    dispatch(logout());
  }, [dispatch]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
          height: top + 64,
        },
      ]}>

      {/* Left */}
      <View style={styles.leftContainer}>

        {showBack && (
          <HeaderActionButton
            onPress={handleBack}>

            <ArrowLeft
              size={22}
              color="#111"
              strokeWidth={2}
            />
          </HeaderActionButton>
        )}

        <Text
          numberOfLines={1}
          style={styles.title}>

          {title}
        </Text>
      </View>

      {/* Right */}
      <View style={styles.rightContainer}>

        {showCart && (
          <HeaderActionButton
            onPress={handleCart}
            badgeCount={cartCount}>

            <ShoppingCart
              size={22}
              color="#111"
              strokeWidth={2}
            />
          </HeaderActionButton>
        )}

        {showLogout && (
          <HeaderActionButton
            onPress={handleLogout}>

            <LogOut
              size={22}
              color="#111"
              strokeWidth={2}
            />
          </HeaderActionButton>
        )}

      </View>

    </View>
  );
};

export default memo(CommonHeader);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',

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
    shadowOpacity: 0.04,
    shadowRadius: 3,

    elevation: 3,
  },

  leftContainer: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    flexShrink: 1,

    marginLeft: 12,

    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

});