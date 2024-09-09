import { RefObject, useCallback, useEffect, useState } from "react"
import { generateImages } from "../utils/utilsImage";
import Toast from "react-native-toast-message";
import { FlatList } from "react-native";

interface IOptImages {
    images: (string | undefined)[];
    range: {
        start: number;
        end: number;
    };
}

interface IProps {
    flatListRef: RefObject<FlatList<any>>;
}

const useImageGallery = ({ flatListRef }: IProps) => {
    const [optImages, setOptImages] = useState<IOptImages>({ images: [], range: { start: 0, end: 19 } });
    const [loading, setLoading] = useState<'fill' | 'refresh' | 'comlete' | 'more'>('comlete');
    const [isMore, setMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /** Заполняет галерею изображений. */
    const fillImages = useCallback(
        async (action: 'fill' | 'refresh' | 'comlete' | 'more') => {
            try {
                setLoading(action);
                const generatedImages = await generateImages({
                    start: optImages.range.start,
                    end: optImages.range.end,
                });

                // Проверка уникальности URL
                const uniqueImages = generatedImages.filter((img) => {
                    const isExisting = optImages.images.some((existingImg) => existingImg === img);
                    return !isExisting;
                });

                setOptImages((prevState) => ({
                    ...prevState,
                    images: action === 'more' ? [...prevState.images, ...uniqueImages] : uniqueImages,
                }));

                setError(null);
                setLoading('comlete');
            } catch (err: any) {
                const errorMessage = err.message.toLowerCase().includes("network")
                    ? "Проверьте подключение к сети"
                    : "Ошибка при получении изображений";
                Toast.show({
                    type: "error",
                    text1: "Ошибка",
                    text2: errorMessage,
                });
                setError(errorMessage);
                setLoading('comlete');
            }
        },
        [optImages.range.start, optImages.range.end, optImages.images]
    );

    /** Обновляет галерею изображений. */
    const refreshImages = useCallback(async () => {
        try {
            await fillImages('refresh');
        } catch (err) {
            console.log(err);
        }
    }, [fillImages]);

    /** Загружает дополнительные изображения. */
    const loadMoreImages = useCallback(async () => {
        try {
            setLoading("more");
            if (!error) {
                const newRange = {
                    start: optImages.range.end + 1,
                    end: optImages.range.end + 20,
                };
                setOptImages((prevState) => ({
                    ...prevState,
                    range: newRange,
                }));
                await fillImages('more');
            }
            setLoading("comlete");
        } catch (err) {
            console.error("Ошибка при загрузке дополнительных изображений:", err);
            setLoading("comlete");
        }
    }, [optImages.range.end, error]);

    /** Отслеживает прокрутку списка для показа кнопки "Вверх". */
    const handleScroll = useCallback((event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setMore(offsetY > 100);
    }, []);

    /** Прокручивает список вверх. */
    const scrollToTop = () => {
        if (flatListRef) {
            flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
        }
    };

    useEffect(() => {
        fillImages('fill')
    }, [])


    return ({
        images: optImages.images,
        refreshImages,
        loadMoreImages,
        loading,
        isMore,
        error,
        handleScroll,
        scrollToTop,
    })
}

export default useImageGallery;