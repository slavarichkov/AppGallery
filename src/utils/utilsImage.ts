import { getRandomImage } from "../api/apiImage";

interface IGenerateImages {
    start: number;
    end: number;
}

/**
 * Генерирует случайные изображения в заданном диапазоне.
 * 
 * @async
 * @function generateImages
 * @param {number} start - Начальное значение диапазона (включительно).
 * @param {number} end - Конечное значение диапазона (включительно).
 * @returns {Promise<(string | undefined)[]>} Возвращает массив URL изображений в случае успеха. 
 * Если произошла ошибка при получении изображения, возвращает undefined в соответствующем элементе массива.
 * @throws {Error} Возникает в случае ошибки при выполнении запроса.
 */
const generateImages = async ({ start, end }: IGenerateImages): Promise<(string | undefined)[]> => {
    const images: (string | undefined)[] = [];

    // Проверка, что end больше start
    if (end < start) {
        throw new Error("'end' должно быть больше или равно 'start'");
    }

    // Генерация изображений для диапазона от start до end
    for (let i = start; i <= end; i++) {
        const imageUrl = await getRandomImage(i);
        images.push(imageUrl);
    }

    return images;
};

export {
    generateImages,
}