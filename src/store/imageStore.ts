// imageStore.ts
import { makeAutoObservable } from 'mobx';

class ImageStore {
    selectedImg: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedImg(url: string | null) {
        this.selectedImg = url;
    }
}

// Экспортируем экземпляр хранилища
export const imageStore = new ImageStore();