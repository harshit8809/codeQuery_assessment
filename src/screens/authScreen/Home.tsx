import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import React, { useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from 'react-redux';

import { logout } from '../../redux/slices/authSlice';

import { useGetProductsQuery } from '../../redux/api/appApis';
import ProductCard from '../../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../constants/constant';



const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useGetProductsQuery('');


    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');

        dispatch(logout());
    };

    const renderItem = useCallback(({ item }: any) => {
        return <ProductCard item={item} onPress={() => navigation.navigate(SCREENS.PRODUCT_DETAILS, { data: item?.id })} />;
    }, []);

    const keyExtractor = useCallback((item: any) => {
        return item.id.toString();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Product List */}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 30,
                    marginTop: 20
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                    />
                }
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                windowSize={5}
                removeClippedSubviews
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 15,
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});