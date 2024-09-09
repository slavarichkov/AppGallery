import React, { useRef } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import useImageGallery from "../hooks/useImageGallery";
import FlatListSeparator from "../components/FlatListSeparator";
import GalleryImage from "../components/GalleryImage";
import NotNework from "../components/NotNetwork";
import AnimatedButton from "../components/AnimatedButton";

/** @screen экран отображения галереи изображений*/
const GalleryScreen = () => {
    const flatListRef = useRef<FlatList>(null);
    const {
        images,
        loading,
        error,
        loadMoreImages,
        refreshImages,
        handleScroll,
        scrollToTop,
        isMore,
    } = useImageGallery({ flatListRef });

    return (
        <View style={styles.container}>
            {loading === 'fill' ?
                <View style={styles.loader}>
                    <ActivityIndicator size={"large"} color={'white'} />
                </View>
                :
                <>
                    <FlatList
                        ref={flatListRef}
                        data={images}
                        ItemSeparatorComponent={FlatListSeparator}
                        renderItem={GalleryImage}
                        keyExtractor={(item) => item.toString()}
                        refreshing={loading === 'refresh'}
                        onRefresh={refreshImages}
                        onEndReached={loadMoreImages}
                        onEndReachedThreshold={0.7}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={styles.contentContainer}
                        ListFooterComponent={loading === 'more' ? <ActivityIndicator color={'white'} /> : <></>}
                        ListEmptyComponent={error ? <NotNework /> : <></>}
                        onScroll={handleScroll}
                    />
                    <View style={styles.upButton}>
                        <AnimatedButton animate={isMore} onPress={scrollToTop} />
                    </View>
                </>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    columnWrapper: {
        justifyContent: 'center',
    },
    contentContainer: {
        width: '100%',
    },
    upButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'white',
    },
})

export default GalleryScreen;