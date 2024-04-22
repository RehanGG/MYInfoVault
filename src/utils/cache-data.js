import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default class NamesCache {
    constructor() {
        if(NamesCache.instance) {
            return NamesCache.instance;
        }
        NamesCache.instance = this;
        this.cache = new Map();
    }

    async getUserName(userId) {
        if(this.cache.has(userId)) {
            return this.cache.get(userId);
        } else {
            const uName = await this.loadFromDatabase(userId);
            this.cache.set(userId, uName);
            return uName;
        }
    }

    async loadFromDatabase(userId) {
        const data = await getDoc(doc(firestore, 'users', userId));
        return data.data().fname;
    }
    
}