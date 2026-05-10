import React, {
  useCallback,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';
import EmptyList from '../../components/section/EmptyList';
import { SCREENS } from '../../constants/constant';
import useHomeProducts from '../../hooks/useHomeProducts';

const Home = () => {
  const navigation = useNavigation<any>();
  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProducts,
    isLoading,
    isFetching,
    refetch,
  } = useHomeProducts();

  const handleProductPress =
    useCallback(
      (id: number) => {
        navigation.navigate(
          SCREENS.PRODUCT_DETAILS,
          {
            data: id,
          },
        );
      },
      [navigation],
    );

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <ProductCard
          item={item}
          onPress={() =>
            handleProductPress(item.id)
          }
        />
      );
    },
    [handleProductPress],
  );

  const keyExtractor =
    useCallback((item: any) => {
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
        selectedCategory={
          selectedCategory
        }
        onSelectCategory={
          setSelectedCategory
        }
      />

      <FlatList
        data={filteredProducts}
        // data={[]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={
          styles.columnWrapper
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.contentContainer
        }
        ListEmptyComponent={
          <EmptyList
            src={require('../../assets/image/emptyList.jpg')}
            text="No data found"
          />
        }
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

  columnWrapper: {
    justifyContent: 'space-between',
  },

  contentContainer: {
    paddingBottom: 30,
    marginTop: 20,
  },
});