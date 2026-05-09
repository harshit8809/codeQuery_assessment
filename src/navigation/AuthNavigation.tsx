import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/authScreen/Home';
import CommonHeader from '../components/CommonHeader';
import { SCREENS } from '../constants/constant';
import ProductDetails from '../screens/authScreen/ProductDetails';
import { useNavigation } from '@react-navigation/native';
import ProductCart from '../screens/authScreen/ProductCart';

const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();
    const HIDE_HEADER_OPTIONS = { headerShown: false };
    const navigation = useNavigation<any>()

    const handlePressBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate(SCREENS.HOME)
        }
    }

    const onCartPress = () => {
        navigation.navigate(SCREENS.PRODUCT_CART)
    }

    return (
        <Stack.Navigator initialRouteName={SCREENS.HOME}>

            <Stack.Screen
                name={SCREENS.HOME}
                component={Home}
                options={{
                    header: () => (
                        <CommonHeader
                            title="Discover Products"
                            rightIcon={
                                <Text>Cart</Text>
                            }
                            onPressRight={onCartPress}
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
                            leftIcon
                            onPressLeft={handlePressBack}
                            rightIcon={
                                <Text>Cart</Text>
                            }
                            onPressRight={onCartPress}
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
                            leftIcon
                            onPressLeft={handlePressBack}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigation

