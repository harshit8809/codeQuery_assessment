import React, {memo} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProductRating from './ProductRating';


const ProductInfo = ({
  product,
}: any) => {
  return (
    <View style={styles.contentContainer}>

      {/* Category */}
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>
          {product?.category}
        </Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {product?.title}
      </Text>

      {/* Rating */}
      <ProductRating
        rate={product?.rating?.rate}
        count={product?.rating?.count}
      />

      {/* Price */}
      <Text style={styles.price}>
        ${product?.price}
      </Text>

      {/* Description */}
      <Text style={styles.descriptionTitle}>
        Description
      </Text>

      <Text style={styles.description}>
        {product?.description}
      </Text>

    </View>
  );
};

export default memo(ProductInfo);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  categoryBadge: {
    alignSelf: 'flex-start',

    backgroundColor: '#E8F0FE',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 20,
  },

  categoryText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '600',

    textTransform: 'capitalize',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',

    marginTop: 14,
    lineHeight: 34,
  },

  price: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',

    marginTop: 20,
  },

  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',

    marginTop: 28,
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: '#666',

    lineHeight: 26,
  },
});