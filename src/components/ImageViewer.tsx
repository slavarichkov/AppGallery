import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { imageStore } from '../store/imageStore';
import ImageViewer from 'react-native-image-zoom-viewer';

/** @component отображает изображение на весь экран */
const ImageViewerComponent = observer(() => {
    const { selectedImg } = imageStore;
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        if (selectedImg) {
            console.log(selectedImg);
            setImages([{ url: selectedImg }]);
        }
    }, [selectedImg]);

    const closeViewer = () => {
        imageStore.setSelectedImg(null);
    };

    return (
        <Modal
            visible={!!selectedImg}
            transparent={true}
            animationType="fade"
            onRequestClose={closeViewer}
        >
            <View style={styles.background} />
            <TouchableOpacity style={styles.buttonClose} onPress={closeViewer}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {images && images.length > 0 &&
                <ImageViewer
                    imageUrls={images}
                    loadingRender={() => <ActivityIndicator />}
                    backgroundColor={'transparent'}
                    index={0} 
                    renderIndicator={() => <></>} 
                />}
        </Modal>
    );
});

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 45,
        fontWeight: '500',
    },
    buttonClose: {
        zIndex: 1000,
        position: 'absolute',
        top: 40,
        right: 20,
    },
});

export default ImageViewerComponent;