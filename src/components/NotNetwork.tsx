import React from "react";
import { Image, StyleSheet, View } from "react-native";
import img from '../assets/images/flat-wifi-zone-concept-with-signal_23-2148190599.jpg';

const NotNework = () => {
    return (
        <View style={styles.container}>
            <Image source={img} style={styles.img} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 250,
        height: 250,
        borderRadius: 170,
    }
})

export default NotNework;