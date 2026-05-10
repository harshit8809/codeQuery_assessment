import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../../redux/api/appApis';
import ProductCard from '../../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../constants/constant';
import SearchBar from '../../components/SearchBar';
import useDebounce from '../../hooks/useDebounce';
import EmptyList from '../../components/section/EmptyList';

const Home = () => {
    const navigation = useNavigation<any>()
    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useGetProductsQuery('');

    const [search, setSearch] =
        useState('');

    const [selectedCategory, setSelectedCategory] =
        useState('All');

    const debouncedSearch =
        useDebounce(search, 500);

    const categories = useMemo(() => {
        if (!data) {
            return ['All'];
        }
        const uniqueCategories = [
            ...new Set(
                data.map(
                    (item: any) => item.category,
                ),
            ),
        ];

        return ['All', ...uniqueCategories];
    }, [data]);

    const filteredProducts = useMemo(() => {
        if (!data) {
            return [];
        }

        return data.filter((item: any) => {
            const matchesSearch =
                item.title
                    .toLowerCase()
                    .includes(
                        debouncedSearch.toLowerCase(),
                    );

            const matchesCategory =
                selectedCategory === 'All'
                    ? true
                    : item.category ===
                    selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [
        data,
        debouncedSearch,
        selectedCategory,
    ]);

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
            <SearchBar
                search={search}
                setSearch={setSearch}
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            {/* Product List */}
            <FlatList
                data={filteredProducts}
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
                ListEmptyComponent={() => <EmptyList src={require("../../assets/image/emptyList.jpg")} text="No data found"/>}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                    />
                }
                initialNumToRender={6}
                maxToRenderPerBatch={6}
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

    emptyContainer: {
        marginTop: 80,
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 16,
        color: '#666',
    },

});