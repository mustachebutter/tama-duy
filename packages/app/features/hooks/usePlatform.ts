import { Platform } from "react-native"

export const usePlatform = () => {
    const isWeb = Platform.OS === 'web'

    return { isWeb }
}