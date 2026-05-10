import {
    useCallback,
    useMemo,
} from 'react';

import {
    useDispatch,
    useSelector,
} from 'react-redux';

import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from '../redux/slices/cartSlice';

import {
    useDeleteCartMutation,
    useUpdateCartMutation,
} from '../redux/api/appApis';

const useCart = () => {
    const dispatch = useDispatch();

    const [updateCartApi] =
        useUpdateCartMutation();

    const [deleteCartApi] =
        useDeleteCartMutation();

    const cartItems = useSelector(
        (state: any) =>
            state.cart.cartItems,
    );

    // Grand Total
    const totalAmount = useMemo(() => {
        return cartItems.reduce(
            (acc: number, item: any) =>
                acc +
                item.price * item.quantity,
            0,
        );
    }, [cartItems]);

    // Increase Quantity
    const handleIncrease = useCallback(
        async (item: any) => {
            if (item.quantity >= 10) {
                return;
            }

            // Optimistic Update
            dispatch(
                increaseQuantity(item.id),
            );

            try {
                await updateCartApi({
                    id: item.id,

                    body: {
                        userId: 2,

                        products: [
                            {
                                productId: item.id,
                                quantity:
                                    item.quantity + 1,
                            },
                        ],
                    },
                }).unwrap();

            } catch (error) {
                console.log(error);

                // Rollback
                dispatch(
                    decreaseQuantity(item.id),
                );
            }
        },
        [dispatch, updateCartApi],
    );

    // Decrease Quantity
    const handleDecrease = useCallback(
        async (item: any) => {

            // Remove Item
            if (item.quantity <= 1) {

                // Optimistic Remove
                dispatch(
                    removeFromCart(item.id),
                );

                try {
                    await deleteCartApi(
                        item.id,
                    ).unwrap();

                } catch (error) {
                    console.log(error);

                    // Rollback
                    dispatch({
                        type: 'cart/addToCart',

                        payload: {
                            ...item,
                            quantity: 1,
                        },
                    });
                }

                return;
            }

            // Optimistic Update
            dispatch(
                decreaseQuantity(item.id),
            );

            try {
                await updateCartApi({
                    id: item.id,

                    body: {
                        userId: 2,

                        products: [
                            {
                                productId: item.id,
                                quantity:
                                    item.quantity - 1,
                            },
                        ],
                    },
                }).unwrap();

            } catch (error) {
                console.log(error);

                // Rollback
                dispatch(
                    increaseQuantity(item.id),
                );
            }
        },
        [
            deleteCartApi,
            dispatch,
            updateCartApi,
        ],
    );

    return {
        cartItems,
        totalAmount,

        handleIncrease,
        handleDecrease,
    };
};

export default useCart;