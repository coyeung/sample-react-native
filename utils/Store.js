import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export async function saveStore(key, value) {
    if(await SecureStore.isAvailableAsync())
        await SecureStore.setItemAsync(key, value);
    else
        await AsyncStorage.setItem(key, value);
}
  
export async function getStore(key) {
    if(await SecureStore.isAvailableAsync())
        return await SecureStore.getItemAsync(key);
    else
        return await AsyncStorage.getItem(key);
}

export async function deleteStore(key) {
    if(await SecureStore.isAvailableAsync())
        await SecureStore.deleteItemAsync(key);
    else
        await AsyncStorage.removeItem(key);
}