import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, StatusBar } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
// import { FontAwesome } from "@expo/vector-icons";
import FontAwesome from 'react-native-vector-icons/AntDesign';
// import { auth, db } from '../firebase';
// import firebase from 'firebase';
export default function ChatScreen({ navigation, route }) {


    const [input, setinput] = useState("")
    const [messages, setMessages] = useState([])



    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            // headerStyle:{backgroundColor:'#fff'},

            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start'

                }}>
                    <Avatar
                        rounded
                        size={40}

                        source={{
                            uri:
                                "https://cdn-icons-png.flaticon.com/512/906/906362.png"
                        }}
                    />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: '800', fontSize: 22 }}>{route.params.chatName}</Text>
                </View>
            ),
            // headerLeft:()=>(
            //     <TouchableOpacity>
            //         <AntDesign name="<LeftOutlined/> " size={24} color="white"/>
            //     </TouchableOpacity>
            // )
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="phone" size={24} color="white" />
                    </TouchableOpacity>
                </View>

            )



        });

    }, [navigation]);

   

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });
        setinput('')

    };



    useLayoutEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(route.params.id)
            .collection('messages')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ));
        return unsubscribe;

    }, [route]);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={90}

                style={styles.container}

            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>

                    <>
                        <ScrollView style={{backgroundColor: 'white'}}>
                            {/* chat */}
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar
                                            rounded
                                            containerStyle={{
                                                position:"absolute",
                                                bottom:-15,
                                                right:-5
                                            }}
                                            position="absolute"

                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.sender}>
                                        <Avatar
                                            rounded
                                            containerStyle={{
                                                position:"absolute",

                                                bottom:-15,
                                                left:-5
                                            }}
                                            position="absolute"

                                            bottom={-15}
                                            left={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text>{data.message}</Text>
                                    </View>
                                )
                            ))}
                            
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput placeholder="Message" style={styles.textInput}
                                value={input}
                                onChangeText={(text) => setinput(text)}
                                onSubmitEditing={sendMessage} />
                            <TouchableOpacity onPress={sendMessage}>
                                <FontAwesome name="paper-plane" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    receiver: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',

    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative',

    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 50,
        flex: 1,
        marginRight: 15,
        borderColor: 'transparent',

        padding: 10,
        color: 'grey',
        borderRadius: 30,
        backgroundColor: '#ECECEC'

    }
})
