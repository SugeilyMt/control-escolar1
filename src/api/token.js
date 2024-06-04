import AsyncStorage from "@react-native-async-storage/async-storage"
import { TOKEN } from "../utils/constantes"

export const setToken = async (value) => {
    try {
        await AsyncStorage.setItem(TOKEN, value)
        return true
    } catch (e) {
        return null
    }
}

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem(TOKEN)
        return value
    } catch (e) {
        return null
    }
}

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN)
        return true
    } catch (e) {
        return null
    }
}