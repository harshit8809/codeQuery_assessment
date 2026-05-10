import React, { useMemo } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../redux/slices/cartSlice';
import BaseButton from '../../components/BaseButton';
import { Trash2 } from 'lucide-react-native';
import { useDeleteCartMutation, useUpdateCartMutation } from '../../redux/api/appApis';

const ProductCart = () => {

  const dispatch = useDispatch();
  const [updateCartApi] =
    useUpdateCartMutation();

  const [deleteCartApi] =
    useDeleteCartMutation();

  const cartItems = useSelector(
    (state: any) => state.cart.cartItems,
  );

  // Grand Total
  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (acc: number, item: any) =>
        acc + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const handleIncrease = async (
    item: any,
  ) => {
    // Max Quantity Limit
    if (item.quantity >= 10) {
      return;
    }

    try {
      // Fake API Call
      await updateCartApi({
        id: item.id,

        body: {
          userId: 2,

          products: [
            {
              productId: item.id,
              quantity: item.quantity + 1,
            },
          ],
        },
      });

      // Redux Update
      dispatch(
        increaseQuantity(item.id),
      );

    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async (
    item: any,
  ) => {
    try {
      // Delete Item
      if (item.quantity <= 1) {
        await deleteCartApi(item.id);
        dispatch(
          removeFromCart(item.id),
        );

        return;
      }

      // Update Quantity
      await updateCartApi({
        id: item.id,
        body: {
          userId: 2,

          products: [
            {
              productId: item.id,
              quantity: item.quantity - 1,
            },
          ],
        },
      });

      dispatch(
        decreaseQuantity(item.id),
      );

    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: any) => {
    const itemTotal =
      item.price * item.quantity;

    return (
      <View style={styles.card}>

        {/* Product Image */}
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />

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

          {/* Price */}
          <Text style={styles.price}>
            ${item.price}
          </Text>

          {/* Quantity Row */}
          <View style={styles.bottomRow}>

            {/* Quantity Controls */}
            <View style={styles.quantityWrapper}>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  handleDecrease(item)
                }>
                {item.quantity < 2 ? <Trash2
                  size={18}
                  color="black"
                  strokeWidth={2}
                /> :
                  <Text style={styles.actionText}>
                    -
                  </Text>}

              </TouchableOpacity>

              <Text style={styles.quantityText}>
                {item.quantity}
              </Text>

              <TouchableOpacity
                disabled={item.quantity >= 10}
                style={[
                  styles.quantityButton,
                  item.quantity >= 10 && {
                    opacity: 0.4,
                  },
                ]}
                onPress={() =>
                  handleIncrease(item)
                }>

                <Text style={styles.actionText}>
                  +
                </Text>
              </TouchableOpacity>

            </View>

            {/* Item Total */}
            <Text style={styles.itemTotal}>
              ${itemTotal.toFixed(2)}
            </Text>

          </View>

        </View>
      </View>
    );
  };

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Your Cart is Empty
        </Text>

        <Text style={styles.emptySubtitle}>
          Add products to continue shopping
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={cartItems}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 120,
        }}
      />

      {/* Bottom Total */}
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
          title='Checkout'
          onPress={() => { }}
        />

      </View>

    </View>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 16,
  },

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
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
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

  checkoutButton: {
    backgroundColor: '#111',

    paddingHorizontal: 28,
    paddingVertical: 14,

    borderRadius: 14,
  },

  checkoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },

  emptySubtitle: {
    fontSize: 15,
    color: '#777',

    marginTop: 10,
  },
});