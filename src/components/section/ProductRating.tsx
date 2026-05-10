import React, {memo} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ProductRating = ({
  rate,
  count,
}: any) => {
  return (
    <View style={styles.ratingRow}>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>
          ⭐ {rate}
        </Text>
      </View>

      <Text style={styles.reviewText}>
        {count} Reviews
      </Text>

    </View>
  );
};

export default memo(ProductRating);

const styles = StyleSheet.create({
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 16,
  },

  ratingContainer: {
    backgroundColor: '#FFF4E5',

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 10,
  },

  ratingText: {
    color: '#F59E0B',
    fontWeight: '700',
  },

  reviewText: {
    marginLeft: 10,

    color: '#666',
    fontSize: 14,
  },
});