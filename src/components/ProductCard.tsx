import React, { memo } from 'react';

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ProductCard = ({
    item,
    onPress,
}: any) => {

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={onPress}>

            <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="contain"
            />

            <View style={styles.contentContainer}>
                <Text
                    numberOfLines={2}
                    style={styles.title}>

                    {item.title}
                </Text>

                <Text style={styles.category}>
                    {item.category}
                </Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.price}>
                        ${item.price}
                    </Text>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>
                            ⭐ {item?.rating?.rate}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default memo(ProductCard);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width: '48%',
        borderRadius: 18,
        marginBottom: 16,
        padding: 12,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4.65,

        elevation: 4,
    },

    productImage: {
        width: '100%',
        height: 140,
        marginBottom: 12,
    },

    contentContainer: {
        flex: 1,
    },

    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111',
        minHeight: 40,
    },

    category: {
        fontSize: 12,
        color: '#777',
        marginTop: 6,
        textTransform: 'capitalize',
    },

    bottomRow: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },

    ratingContainer: {
        backgroundColor: '#F2F4F7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },

    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#111',
    },
});