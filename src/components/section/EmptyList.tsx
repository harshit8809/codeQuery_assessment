import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/dimenstion'
import BaseButton from '../BaseButton'

const EmptyList = ({ src, text, btn, onPress }: any) => {
    return (
        <View style={styles.container}>
            <Image
                source={src}
                style={styles.image}
            />
            <Text style={styles.text}>
                {text}
            </Text>
            <View style={{height: 30}}/>

            {btn && <BaseButton
                title='Go to Product List'
                onPress={onPress}
            />}
            
        </View>
    )
}

export default EmptyList

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },

    image: {
        height: height / 3,
        width: width,
        resizeMode: 'contain',
    },

    text: {
        fontSize: 20,
        marginTop: 40,
    },
})