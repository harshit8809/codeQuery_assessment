import React, { memo } from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Trash2 } from 'lucide-react-native';

const CartItemCard = ({
  item,
  onIncrease,
  onDecrease,
  onPress
}: any) => {
  const itemTotal =
    item.price * item.quantity;

  return (
    <View style={styles.card}>

      {/* Image */}
      <Pressable onPress={onPress}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </Pressable>

      {/* Content */}
      <View style={styles.contentContainer}>


        <Text
          numberOfLines={2}
          style={styles.title}>

          {item.title}
        </Text>

        <Text style={styles.category}>
          {item.category}
        </Text>

        <Text style={styles.price}>
          ${item.price}
        </Text>

        {/* Bottom */}
        <View style={styles.bottomRow}>

          {/* Quantity */}
          <View style={styles.quantityWrapper}>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={onDecrease}>

              {item.quantity < 2 ? (
                <Trash2
                  size={18}
                  color="black"
                  strokeWidth={2}
                />
              ) : (
                <Text style={styles.actionText}>
                  -
                </Text>
              )}
            </TouchableOpacity>

            <Text style={styles.quantityText}>
              {item.quantity}
            </Text>

            <TouchableOpacity
              disabled={
                item.quantity >= 10
              }
              style={[
                styles.quantityButton,

                item.quantity >= 10 && {
                  opacity: 0.4,
                },
              ]}
              onPress={onIncrease}>

              <Text style={styles.actionText}>
                +
              </Text>
            </TouchableOpacity>

          </View>

          {/* Total */}
          <Text style={styles.itemTotal}>
            ${itemTotal.toFixed(2)}
          </Text>

        </View>

      </View>

    </View>
  );
};

export default memo(CartItemCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',

    flexDirection: 'row',

    borderRadius: 18,

    padding: 12,

    marginBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,

    elevation: 3,
  },

  productImage: {
    width: 100,
    height: 100,

    borderRadius: 14,

    backgroundColor: '#F8F8F8',
  },

  contentContainer: {
    flex: 1,
    marginLeft: 14,

    justifyContent:
      'space-between',
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',

    lineHeight: 22,
  },

  category: {
    fontSize: 13,
    color: '#777',

    marginTop: 4,

    textTransform: 'capitalize',
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',

    marginTop: 10,
  },

  bottomRow: {
    marginTop: 14,

    flexDirection: 'row',
    justifyContent:
      'space-between',

    alignItems: 'center',
  },

  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F2F4F7',

    borderRadius: 12,

    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  quantityButton: {
    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',
  },

  actionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  quantityText: {
    marginHorizontal: 14,

    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },

  itemTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
});