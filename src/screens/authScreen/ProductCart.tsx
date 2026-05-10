import React, {
  useCallback,
} from 'react';

import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import CartFooter from '../../components/cart/CartFooter';
import CartItemCard from '../../components/cart/CartItemCard';

import useCart from '../../hooks/useCart';
import EmptyList from '../../components/section/EmptyList';
import { SCREENS } from '../../constants/constant';

const ProductCart = ({ navigation }: any) => {
  const {
    cartItems,
    totalAmount,
    handleIncrease,
    handleDecrease,
  } = useCart();


  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <CartItemCard
          item={item}
          onIncrease={() =>
            handleIncrease(item)
          }
          onDecrease={() =>
            handleDecrease(item)
          }
          onPress={()=>navigation.navigate(SCREENS.PRODUCT_DETAILS, {data: item?.id})}
        />
      );
    },
    [
      handleDecrease,
      handleIncrease,
    ],
  );

  // Empty Cart
  if (cartItems.length === 0) {
    return <EmptyList src={require("../../assets/image/emptyCart.jpg")} text="Cart is empty" btn onPress={() => navigation.navigate(SCREENS.HOME)} />
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={cartItems}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 120,
        }}
      />

      <CartFooter
        totalAmount={totalAmount}
      />

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
});