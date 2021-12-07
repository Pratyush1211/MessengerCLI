import React ,{useLayoutEffect,useState}from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button,Input } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/FontAwesome';
// import { db } from '../firebase';



export default function AddChatScreen({navigation}) {

    const [input, setinput] = useState("")

    const CreateChat= async ()=>{
        await db
        .collection('chats')
        .add({
            chatName:input
        })
        .then(()=>{
            navigation.goBack();
        })
        .catch((error)=>alert(error));

    };

    
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new Chat",
            headerBackTitle:"Chats",
            headerStyle:{backgroundColor:'#fff'},
            headerTitleStyle:{color:'#000'},
            headerTintColor:"black",
            headerTitleAlign:'center'
        });
           
          
    },[navigation]);

    return (
        <View style={styles.container}>
           <Input
           placeholder="Enter a name to chat"
           value={input}
           onChangeText={(text)=>setinput(text)}
           leftIcon={
               <Icon name="wechat" type="antdesign" size={24} color="black"/>
           }
           onSubmitEditing={CreateChat}
           />
           <Button onPress={CreateChat} title="Create new Chat"/>
        
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        padding:20
    },
});
