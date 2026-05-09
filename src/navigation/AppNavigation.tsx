import { StyleSheet, ActivityIndicator, View } from 'react-native';
import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from './AuthNavigation';
import LoginScreen from '../screens/LoginScreen';

import { useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    setCredentials,
    setAuthChecked,
} from '../redux/slices/authSlice';

const AppNavigation = () => {
    const dispatch = useDispatch();

    const { token, isAuthChecked } = useSelector(
        (state: any) => state.auth,
    );

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        try {
            const savedToken =
                await AsyncStorage.getItem('token');

            if (savedToken) {
                dispatch(
                    setCredentials({
                        token: savedToken,
                    }),
                );
            }
        } catch (error) {
            console.log('TOKEN ERROR', error);
        } finally {
            dispatch(setAuthChecked(true));
        }
    };

    // Splash Loading
    if (!isAuthChecked) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {token ? (
                <AuthNavigation />
            ) : (
                <LoginScreen />
            )}
        </NavigationContainer>
    );
};

export default AppNavigation;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});