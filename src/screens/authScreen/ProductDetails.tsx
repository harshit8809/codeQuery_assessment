import React from 'react';

import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import BaseButton from '../../components/BaseButton';

import useProductDetails from '../../hooks/useProductDetails';
import ProductImageSection from '../../components/section/ProductImageSection';
import ProductInfo from '../../components/section/ProductInfo';

const ProductDetails = ({
    route,
}: any) => {
    const { data } =
        route?.params || {};

    const {
        productData,
        isLoading,
        handleAddToCart,
        cartLoading,
    } = useProductDetails(data);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={{
                    paddingBottom: 30,
                }}>
                <ProductImageSection
                    image={productData?.image}
                />
                <ProductInfo
                    product={productData}
                />
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomContainer}>
                <BaseButton
                    title={
                        cartLoading
                            ? 'Adding...'
                            : 'Add To Cart'
                    }
                    onPress={handleAddToCart}
                    isLoading={cartLoading}
                />
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

    bottomContainer: {
        backgroundColor: '#fff',

        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 25,

        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
});