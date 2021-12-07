import React, { useState ,useEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, StatusBar } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'

// helpers
import post from '../services/http/post'
import write from '../services/localstorage/write'
import read from '../services/localstorage/read'

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        async function checkLogin(){
            try{
                let token = await read('token')
                if(token){
                    console.log('Token Found!!')
                    navigation.replace("Home")
                } 
            } catch(err){
                console.log('Token Not Found')
            }
        }
        checkLogin()
    }, []);

    const SignIn = async() => {

        try{
            let data = {
                email: email,
                password: password
            }
            let res = await post('/auth/login', data)
            if(res.error){
                throw new Error(res.error.message)
            } else if(res.message == "success"){
                console.log('Response ', res)
                await write('token', res.accessToken)
                navigation.replace("Home")
            }
            
        } catch(err){
            console.log('Error ', err)
            alert('Cannot Login!!')
        }

    };

    return (
        <KeyboardAvoidingView behaviour="padding" style={styles.Container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={SignIn}
                />
            </View>
            <Button containerStyle={styles.button} onPress={SignIn} title="Login" />
            <Button containerStyle={styles.button} onPress={()=>navigation.navigate("Register")} type="outline" title="Register" />
            <View style={{ height: 50 }} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,

    },
});