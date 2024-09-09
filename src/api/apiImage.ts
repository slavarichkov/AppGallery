import axios from "axios";
import { hostImages } from "./hosts";

/**
 * Получает случайное изображение по переданному номеру с сервера Lorem Picsum.
 * 
 * @async
 * @function getRandomImage
 * @param {number} randomNumber - Номер изображения.
 * @returns {Promise<string | undefined>} Возвращает URL случайного изображения в случае успеха. 
 * Если произошла ошибка, возвращает undefined.
 * @throws {Error} Возникает в случае ошибки при выполнении запроса.
 */
const getRandomImage = async (randomNumber: number): Promise<string | undefined> => {
    const response = await axios.get(`${hostImages}${randomNumber.toString()}`, {
        responseType: 'blob',
    });
    const imageUrl = response.request.responseURL;
    return imageUrl;
};

export {
    getRandomImage,
}