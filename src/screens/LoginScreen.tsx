import {
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoginMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseButton from '../components/BaseButton';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await login({
                username: email,
                password: password,
            }).unwrap();

            console.log('LOGIN RESPONSE', response);

            // Save token in redux
            dispatch(setCredentials(response));
            ToastAndroid.show('Welcome', ToastAndroid.SHORT);


            // Save token locally
            await AsyncStorage.setItem(
                'token',
                response.token,
            );

            // Navigate
            // navigation.replace('Home');

        } catch (error) {
            ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back 👋</Text>
                <Text style={styles.subtitle}>
                    Login to continue shopping
                </Text>

                {/* Email / Username */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email / Username</Text>
                    <TextInput
                        placeholder="Enter email or username"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                    />
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="Enter password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                {/* Login Button */}
                <BaseButton
                    title="Login"
                    onPress={handleLogin}
                    isLoading={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: "40%",
        paddingHorizontal: 20,
    },

    content: {
        width: '100%',
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },

    inputContainer: {
        marginBottom: 18,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },

    button: {
        backgroundColor: '#000',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});