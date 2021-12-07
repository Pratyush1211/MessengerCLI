import AsyncStorage from '@react-native-async-storage/async-storage';

async function read(key){

    try{
        const value = await AsyncStorage.getItem(key)

        return value

    } catch(err){
        return err
    }

}

export default read