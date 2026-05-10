import React, {memo} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const EmptyCart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your Cart is Empty
      </Text>

      <Text style={styles.subtitle}>
        Add products to continue shopping
      </Text>
    </View>
  );
};

export default memo(EmptyCart);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    fontSize: 15,
    color: '#777',

    marginTop: 10,
  },
});