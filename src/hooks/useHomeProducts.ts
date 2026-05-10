import {
    useMemo,
    useState,
  } from 'react';
  import useDebounce from './useDebounce';
  import {
    useGetProductsQuery,
  } from '../redux/api/appApis';
  
  const useHomeProducts = () => {
    const {
      data,
      isLoading,
      isFetching,
      refetch,
    } = useGetProductsQuery('');
  
    const [search, setSearch] =
      useState('');
  
    const [
      selectedCategory,
      setSelectedCategory,
    ] = useState('All');
  
    const debouncedSearch =
      useDebounce(search, 500);
  
    // Categories
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
  
      return [
        'All',
        ...uniqueCategories,
      ];
    }, [data]);
  
    // Filter Products
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
  
    return {
      search,
      setSearch,
  
      selectedCategory,
      setSelectedCategory,
  
      categories,
  
      filteredProducts,
  
      isLoading,
      isFetching,
      refetch,
    };
  };
  
  export default useHomeProducts;