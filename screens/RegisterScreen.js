import React, { useState, useLayoutEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, View, StatusBar } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
// import { auth } from "../firebase"
export default function RegisterScreen({ navigation }) {

    const [name, setname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageurl, setimage] = useState("")

    // useLayoutEffect(()=>{
    //     navigation.setOptions({
    //         headerBackTitle:"Back to Login"

    //     });

    // },[navigation]);

    // const register = () => {
    //     auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then((authUser) => {
    //             authUser.user.updateProfile({
    //                 displayName: name,
    //                 photoURL: imageurl || "https://cdn-icons-png.flaticon.com/512/906/906362.png",

    //             });
    //         })
    //         .catch((error) => alert(error.message));
    // };
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create a React account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Enter Full name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setname(text)}
                />
                <Input
                    placeholder="Enter Email"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Set Password"
                    type="password"
                    value={password}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder="Profile Picture URL(optional)"
                    type="text"
                    value={imageurl}
                    onChangeText={(text) => setimage(text)}
                    onSubmitEditing={register}
                />

            </View>
            <View style={{ height: 50 }} />
            <Button title="Register"
                raised
                // onPress={}
                containerStyle={styles.button}
            />


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    }

})
