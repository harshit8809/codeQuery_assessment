import React from 'react';

import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useAddToCartMutation, useGetProductByIdQuery } from '../../redux/api/appApis';
import BaseButton from '../../components/BaseButton';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetails = ({ route }: any) => {
    const { data } = route?.params || {};
    const dispatch = useDispatch();

    const [addToCartApi, { isLoading: cartLoading }] =
        useAddToCartMutation();

    const {
        data: productData,
        isLoading,
    } = useGetProductByIdQuery(data);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const handleCart = async () => {
        try {
          // Optional Fake API Call
          await addToCartApi({
            userId: 2,
            products: [
              {
                productId: productData?.id,
                quantity: 1,
              },
            ],
          });
      
          // Actual App Cart State
          dispatch(
            addToCart({
              id: productData?.id,
              title: productData?.title,
              image: productData?.image,
              price: productData?.price,
              category: productData?.category,
            }),
          );
      
          console.log('Added Successfully');
      
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 30,
                }}>

                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: productData?.image }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>

                    {/* Category */}
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>
                            {productData?.category}
                        </Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>
                        {productData?.title}
                    </Text>

                    {/* Rating */}
                    <View style={styles.ratingRow}>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>
                                ⭐ {productData?.rating?.rate}
                            </Text>
                        </View>

                        <Text style={styles.reviewText}>
                            {productData?.rating?.count} Reviews
                        </Text>
                    </View>

                    {/* Price */}
                    <Text style={styles.price}>
                        ${productData?.price}
                    </Text>

                    {/* Description */}
                    <Text style={styles.descriptionTitle}>
                        Description
                    </Text>

                    <Text style={styles.description}>
                        {productData?.description}
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomContainer}>
                <BaseButton title='Add To Cart' onPress={handleCart} />
            </View>
        </View>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

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

    bottomContainer: {
        backgroundColor: '#fff',

        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 25,

        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
});