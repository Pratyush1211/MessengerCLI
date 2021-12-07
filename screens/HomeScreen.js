import React, { useLayoutEffect,useState,useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,StatusBar } from 'react-native';
import { Avatar } from "react-native-elements"
import Customlistitem from '../components/Customlistitem';
// import { auth, db } from '../firebase';
// import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const HomeScreen = ({ navigation }) => {


    const SignOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    };

    const [chats, setchats] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) => 
            setchats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
            )
        );
        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Messenger",
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: '#000' },
            headerTintColor: "black",          
            headerLeft: () => (<View style={{ marginLeft: 0,marginRight:15 }}>
                <TouchableOpacity onPress={SignOutUser}>
                    <Avatar
                        rounded
                        source={{ uri: auth?.currentUser?.photoURL }} />
                </TouchableOpacity>
            </View>
            ),

            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity >
                        <AntDesign name="camerao" size={26} color="black" />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} >
                        <SimpleLineIcons name="pencil" size={24} color="black" />

                    </TouchableOpacity>
                </View>

            )

        });
    }, [navigation])

    const enterChat=(id,chatName)=>{
        navigation.navigate("Chat",{
            id,
            chatName,
        });
    }


    return (
        <ScrollView style={styles.container}>
            <StatusBar style="auto" />
            {chats.map(({id,data:{chatName}})=>(
                <Customlistitem key={id} chatName={chatName} enterChat={enterChat}/>
            ))}
            
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height:"100%",
        
    }
})
