import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import {
  useAddToCartMutation,
  useGetProductByIdQuery,
} from '../redux/api/appApis';

import { addToCart } from '../redux/slices/cartSlice';
import { ToastAndroid } from 'react-native';

const useProductDetails = (
  productId: number,
) => {
  const dispatch = useDispatch();

  const [
    addToCartApi,
    { isLoading: cartLoading },
  ] = useAddToCartMutation();

  const {
    data: productData,
    isLoading,
  } = useGetProductByIdQuery(
    productId,
  );

  const handleAddToCart =
    useCallback(async () => {
      if (!productData) {
        return;
      }

      try {
        // Fake API
        await addToCartApi({
          userId: 2,

          products: [
            {
              productId:
                productData.id,

              quantity: 1,
            },
          ],
        });
        ToastAndroid.show('Added to cart', ToastAndroid.SHORT)
        // Redux
        dispatch(
          addToCart({
            id: productData.id,
            title: productData.title,
            image: productData.image,
            price: productData.price,
            category:
              productData.category,
          }),
        );

      } catch (error) {
        console.log(error);
      }
    }, [
      addToCartApi,
      dispatch,
      productData,
    ]);

  return {
    productData,
    isLoading,
    cartLoading,
    handleAddToCart,
  };
};

export default useProductDetails;