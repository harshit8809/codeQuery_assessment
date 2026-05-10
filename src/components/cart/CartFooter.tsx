import React, {memo} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BaseButton from '../BaseButton';

const CartFooter = ({
  totalAmount,
}: any) => {
  return (
    <View style={styles.bottomContainer}>

      <View>
        <Text style={styles.totalLabel}>
          Total Amount
        </Text>

        <Text style={styles.totalAmount}>
          ${totalAmount.toFixed(2)}
        </Text>
      </View>

      <BaseButton
        title="Checkout"
        onPress={() => {}}
      />

    </View>
  );
};

export default memo(CartFooter);

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: '#fff',

    paddingHorizontal: 20,
    paddingVertical: 18,

    borderTopWidth: 1,
    borderTopColor: '#EEE',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 13,
    color: '#777',
  },

  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',

    marginTop: 4,
  },
});