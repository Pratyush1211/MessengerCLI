import AsyncStorage from '@react-native-async-storage/async-storage';

async function write(key, value){

    if(!key || !value) return new Error('write.js: Inavlid Format')

    if(value === 'null') {
        await AsyncStorage.removeItem(key)
    } else {
        await AsyncStorage.setItem(key, value)
    }

    return true
}

export default write