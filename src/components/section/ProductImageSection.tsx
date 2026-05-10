import React, {memo} from 'react';

import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

const ProductImageSection = ({
  image,
}: any) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{uri: image}}
        style={styles.productImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default memo(
  ProductImageSection,
);

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 30,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  productImage: {
    width: '80%',
    height: 320,
  },
});