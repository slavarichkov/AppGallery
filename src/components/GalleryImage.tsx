import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { imageStore } from "../store/imageStore"; 

interface IProps {
    item: string;
}

/** @component отображения изображения в галерее */
const GalleryImage = ({ item }: IProps) => {

    const handlePress = () => {
        imageStore.setSelectedImg(item);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image
                source={{ uri: item }}
                style={styles.image}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '40%',
        height: 150,
        borderRadius: 10,
        margin: 5, 
        overflow: 'hidden', 
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    }
});

export default GalleryImage;