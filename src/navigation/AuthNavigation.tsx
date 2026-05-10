import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/authScreen/Home';
import CommonHeader from '../components/CommonHeader';
import { SCREENS } from '../constants/constant';
import ProductDetails from '../screens/authScreen/ProductDetails';
import ProductCart from '../screens/authScreen/ProductCart';

const Stack = createNativeStackNavigator();


const AuthNavigation = () => {

    return (
        <Stack.Navigator initialRouteName={SCREENS.HOME}>

            <Stack.Screen
                name={SCREENS.HOME}
                component={Home}
                options={{
                    header: () => (
                        <CommonHeader
                            title="Product Details"
                            showCart
                            showLogout
                        />
                    ),
                }}
            />

            <Stack.Screen
                name={SCREENS.PRODUCT_DETAILS}
                component={ProductDetails}
                options={{
                    header: () => (
                        <CommonHeader
                            title="Product Details"
                            showBack
                            showCart
                        />
                    ),
                }}
            />

            <Stack.Screen
                name={SCREENS.PRODUCT_CART}
                component={ProductCart}
                options={{
                    header: () => (
                        <CommonHeader
                            title="Cart Items"
                            showBack
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigation

