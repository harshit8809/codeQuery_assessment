import React, { useMemo } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useGetAllCartsQuery,
  useGetProductsQuery,
} from '../../redux/api/appApis';

const ProductCart = () => {
  const userId = 2;

  const {
    data: cartData,
    isLoading,
  } = useGetAllCartsQuery('');

  const {
    data: products,
  } = useGetProductsQuery('');

  // Get User Cart
  const userCart = useMemo(() => {
    return cartData?.find(
      (item: any) => item.userId === userId,
    );
  }, [cartData]);

  // Merge Product Details
  const mappedCartProducts = useMemo(() => {
    if (!userCart || !products) {
      return [];
    }

    return userCart.products.map(
      (cartItem: any) => {
        const productDetails = products.find(
          (product: any) =>
            product.id === cartItem.productId,
        );

        return {
          ...productDetails,
          quantity: cartItem.quantity,
        };
      },
    );
  }, [userCart, products]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item }: any) => {
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

          {/* Price + Quantity */}
          <View style={styles.bottomRow}>

            <Text style={styles.price}>
              ${item.price}
            </Text>

            <View style={styles.quantityContainer}>
              <Text style={styles.quantityText}>
                Qty: {item.quantity}
              </Text>
            </View>

          </View>

        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={mappedCartProducts}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 30,
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No Cart Items Found
            </Text>
          </View>
        )}
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

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 6,

    fontSize: 13,
    color: '#777',

    textTransform: 'capitalize',
  },

  bottomRow: {
    marginTop: 14,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

  quantityContainer: {
    backgroundColor: '#F2F4F7',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 10,
  },

  quantityText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },

  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});