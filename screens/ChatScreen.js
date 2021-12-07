import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, StatusBar } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import FontAwesome from 'react-native-vector-icons/AntDesign';
import get from '../services/http/get'
import read from '../services/localstorage/read'
import socket from '../services/config/socket'
import { RSA } from 'react-native-rsa-native'
import write from '../services/localstorage/write';


let privateKey = `-----BEGIN RSA PRIVATE KEY-----\nMIIJKQIBAAKCAgEAuxcMR4kBoqR3FCgvPkHIdVjfrwa9g4pPfC2wNIpRJhWL/L74\n/
vU+bES+/2QKQu5gymPwRSBHs65bLcW4pmQdny81cuZcRk5JZfLjJulumIyma1vx\nyBlMTH+48jITPlxjKiU1+I0l2EXZxWcBKU/ay6oLr7pKaMValQhUsR0
Id77dNFbs\njT1Z6RNUA5pBZPxMHkGySNml3ex+mHzWOxUxnkjmf0RrupEKyRW0WKFP9IPdZAlo\n3mFbP4fVUnclNgAORSKcWNCbK+6SVJJfzjD8GEUxb6H2Mn
qFzCC9/BnezWUHRGhX\nkKdk7Jk0/ZCUSS2rleXMMxUX/k34Syzz95q48g7Ep/ANoXXAALly6GNf5PbeJjB0\n/tB/frU8yzOUGRakxbg1unlLov71HILCrHmGuS5
Z0kSdJYJY48F4PjEietyhRVfd\nKbyyVDsO0daO8pKD9Ia3SxJfMMd5UIG71BYD+uVBrq1y5ibCM5fGR/A2/xbDa96V\nJWgv6CkLOqogwTr+sDoNU4ZDCB4OU+HZ
SxpMNzOUhhChBk5+ZWPLvwKwpPei/idz\nqc51/b3v8jduZaIYRZ2q3tKBzNQsY3whkXYKtELpg9GfMEFMY4jFdUzIcwxxwzc6\nBgLkMySSx/yvYSAHpDXs3t5HM
MkbHFdzvOYGZ5zAmFPJX09sX4fVisDenU0CAwEA\nAQKCAgAEKA7tx+1xX5YFrJ7gEzYQ5ViS2uN6+KeraphvkmMbJX9mrhd6EpjAbwaP\nRfm0Yvdjh7Te1EjDhS
whaDMh/zdpQfM+CkAij7qxuSOyyZzbZsSLvg8xEt7PFEdX\nmiUzTXomhY0daIVeuK6N5CvybwO9Ypm/3bOpgDjy9qxrAuodPvBLKWM4ABTvSK6l\nJdguFizavzr
mw28b7xUg7iUUSvQ/P/9e9HYwPuiubv0CuxK7q/JPNqZNynvsfWgP\n3PXGrVmjz5EJqBjKcRJvLpFSU2RGZcMjZ8XAeVhfoJqX7zsz9PqkWm0XmaB0YTL8\nLyocN
heJzQEsYVuXGsRZZzZEWfuh20sd7nOQIM6fgy+NwOzaSNfFa/s9kvj0bBeQ\nZQKAc+MCkzVNwQkoV+6xOpaAL7+CERqgMUTTbfAhi3KFlW9A0PIt0+XGPaQX4bRk\n
NTn1LafmjIZjXue7r4pQlKJuCwvGfO2ljtJRi5McmlwpSZ16rhEV5uhjrABmmdzu\nrVQasjuEx7f3kJ0QWNJpQzTsW4X95fNrD3+vvkgoj4rkX7oz9XhFrnqf82Ifc
bOo\nFpV7jG33F7gXVNWXrA0Jl4JEWiDteTSgMPUuQ30J52GdVtAI69dDoJMBcg/C+Mzd\nfeaLaYayfMPGkN9aL6TPVoNJmf2SDMRTpwp39wOFEv5XrsCbQQKCAQEA
8vXop9/d\nw+Zh4doVni6nSYDfshK33hR18H984ST4L7Cq0yWCEbW+CXe+RDscGQV5MI6xCDbt\n4Hli+sgVcIIrCqFbZVlQP78rUIyECpCoWxj1czEekUNUSBlC8sn
m627KuF48BkfM\nS3HDJ++/GtfbrTi3Ij3pZCUJpAlahX8X5zJ38oS7XxHYt0YsqVvdzQjOPSmyaPJ1\njBshyej/grQpJPPqWOsh+VvbBfMv2JUHbG9Pq/UPgYqp7l
qKksoIjRq1b0WdGwJ0\noCcX0Tm6UC7l8l8GpbjcQiDvVwDjBNHetseIZCGAmrQAPNlAPCAo66ONUSHzSriW\n3eOFfAxxhiYjTwKCAQEAxSGFVftgdv4ivnFGBtgPqj
CRyjk2YcwyFDbkBfgDpaQz\nHsFIK0saN8TmdW8qAOkEzo0DA0DR3yMcR2E1a2FSmTWUe7pUqvUAgxOMzyEILK3G\nCM9VxXx18akssCyIVd4PszHHq2jtN1SgtKBxT/
ZLlHvxOGvhOMblJ40IiWrMyNvd\nsDGC872s9cT5OM8WA7UYF/GukhmZjlxvQhHiNEfKplXobASWP6N8EXbRcvfwKLwI\noxWgCF0GehcvUihwOZdzMutkUzTIK9Fb0ac
IRjRSwATDoTeqRMUxayMS5kbF6kk/\nyEDvu4BdvEIJ8KrER+T0nBS5is1w+VyHUYO0dyc+owKCAQEA8X4Vu88biZ2Tyz7O\n4AS1SK0tK73JPpeNxvehM9RgUF7E3MzaZSoFczmvR/iM7B3xoJ8kPesDNGzTQjvg\ne40WpSFPTASjbEljD1Qr5qh0ft/nEJFRNcf7nRJm5hZjTb45B1q7RO7WlGLGPQrj\nJBZMhvfpp8JsGptp4r9dV3XFV4tliAwAhfWiOEErIUdrxmGrRUYNzJy61AEf66aJ\nWewjPVSoqatFgKqZoGdhNmCjGVfmlCAoQnWGhKFAPblNGJvknW5PQ0qEi69v0AoW\nM5759pgXbl+5po0/+HWsMN0+BuV7nzNhteOWnOTAIUNCCT3uuCcLwUiKxJBi3LMt\nn86GpwKCAQEAhWxDt8dVKhSl5Wn7cIRqTdFjy5Bfm1++gWoJeXS82y7Ans9JDmxd\niWOOa+tabZVJeJd+c4Q6yCEWccV8h3oukp3uKrQZvD/pIc5onoSH6N2QzMOwFONB\nXNgY9ACgIiYTUECgGQcCj1GLF9YD+5AC5bPht0NlA62yycst/Pw5MLWHXUqVjG1T\nlGDGIcof51B5xzL/6cjD4tPzRa+e/62bnmtEzV9pZhc70QIvjvX7KUbjPaZUU3TK\n/nWUxLG0C3bTNKKXm6180hN4ZvT7p7CgVXCkDAkGCFfDM/VgRFWgfQsozVwOJkUi\nrFmyKp8aDGMNoFpynlygW1ZiDCztRzxbqwKCAQBFe4XhicotgKPmhhqnZKBcykVt\n08uBcIMbojLqcdGV9/P/phY/m9XAxCYgbJ/QDC/i+2CbvlyFnOfpn/4ZKgA9owgK\nLf89NsHdGcFLkC1GRDwCe3k1Zyo+a/jllQRegTB5ljOIA+r9zLtBPkKyvlalhrY6\nynLDeGnBQCedTNsN3SnJV9yOIx5lOoOyk7ZbBu9/blJUTA5XxiJ80C/0jWuCVuhN\n9oR/4WOmzGR1atcy9wSaslFw6BxhsUq3+965EHuSapznw2n9q9RQG0rUqXJLeTCI\nVLTFUmv2dDpIl1+DuFPfb8UzLiV8gejyeH8oxPaT2MbiIzEZavJ220vWIi5R\n-----END RSA PRIVATE KEY-----\n`

let publicKey = `
-----BEGIN RSA PUBLIC KEY-----\nMIICCgKCAgEAuxcMR4kBoqR3FCgvPkHIdVjfrwa9g4pPfC2wNIpRJhWL/L74/vU+\nbES
+/2QKQu5gymPwRSBHs65bLcW4pmQdny81cuZcRk5JZfLjJulumIyma1vxyBlM\nTH+48jITPlxjKiU1+I0l2EXZxWcBKU/ay6oLr7pKaMValQhUsR0Id77dNFbsjT1Z\n
6RNUA5pBZPxMHkGySNml3ex+mHzWOxUxnkjmf0RrupEKyRW0WKFP9IPdZAlo3mFb\nP4fVUnclNgAORSKcWNCbK+6SVJJfzjD8GEUxb6H2MnqFzCC9/BnezWUHRGhXkKdk\n
7Jk0/ZCUSS2rleXMMxUX/k34Syzz95q48g7Ep/ANoXXAALly6GNf5PbeJjB0/tB/\nfrU8yzOUGRakxbg1unlLov71HILCrHmGuS5Z0kSdJYJY48F4PjEietyhRVfdKbyy\n
VDsO0daO8pKD9Ia3SxJfMMd5UIG71BYD+uVBrq1y5ibCM5fGR/A2/xbDa96VJWgv\n6CkLOqogwTr+sDoNU4ZDCB4OU+HZSxpMNzOUhhChBk5+ZWPLvwKwpPei/idzqc51\n
/b3v8jduZaIYRZ2q3tKBzNQsY3whkXYKtELpg9GfMEFMY4jFdUzIcwxxwzc6BgLk\nMySSx/yvYSAHpDXs3t5HMMkbHFdzvOYGZ5zAmFPJX09sX4fVisDenU0CAwEAAQ==\n-----END RSA PUBLIC KEY-----\n
`


export default function ChatScreen({ navigation, route }) {

    const [input, setinput] = useState("")
    const [messages, setMessages] = useState([])
    const [friendId, setFriendId] = useState("")
    const [userId, setUserId] = useState("")
    const [rid, setRId] = useState(100)
    const [pvtKey, setPvtKey] = useState("")


    async function decryptMessages(messages){
        for(let i=0;i<messages.length;i++){
            let dm = await RSA.decrypt(messages[i].message, privateKey)
            messages[i].message = dm
        }
        return messages
    }

    useEffect(() => {
        let unmounted = false;

        async function fetchData(){
            try{
                console.log('Routes ', route)
                let chatName = route.params.chatName
                setFriendId(chatName)
                let chatId = await read('email')
                setUserId(chatId)
                let token = await read('token')
                let res = await get(`/chat/chatMessages?userId=${chatId}&friendId=${chatName}`, token)
                console.log('ChatScreen Messages ', res.data)
                let mess = await decryptMessages(res.data)
                setMessages(mess)

                // register with socket handler
                socket.emit("register", {
                    userId: chatId
                })

                // fetch my private keys from local storage for this chat
                // key-example@gmail.com denotes my pvt key for the user
                // this user will need my public key to decrypt the message that I will send
                // similary this user will encrypt his message with his private key
                // and I will have to decrypt his message using public key

                // let privateKey = await read(`key-${chatName}`)

                // setPvtKey(privateKey)

                // listen for incoming messages
                socket.on('chat:receive', (data)=>{
                    setMessages((prevMess)=>{
                        [
                            ...prevMess,
                            data
                        ]
                    })
                })

            } catch(err){
                console.log('Error ', err)
                alert('Error ', err)
            }
        }
        fetchData()
        return ()=>{
            unmounted = true
        }
    }, []);

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

   

    const sendMessage = async() => {

        let newMessage = {
            _id: rid,
            from: userId,
            to: friendId,
            message: input
        }
        setRId(rid+1)
        setMessages([
            ...messages,
            newMessage
        ])

        let encryptedMessage = await RSA.encrypt(input, publicKey)

        // send message
        socket.emit("chat:send", {
            from: userId,
            to: friendId,
            message: encryptedMessage
        })

        Keyboard.dismiss();

        console.log('Message ', input)
        setinput('')

    };

    // useLayoutEffect(() => {
    //     // const unsubscribe = db
    //     //     .collection("chats")
    //     //     .doc(route.params.id)
    //     //     .collection('messages')
    //     //     .orderBy("timestamp", "desc")
    //     //     .onSnapshot((snapshot) => setMessages(
    //     //         snapshot.docs.map(doc => ({
    //     //             id: doc.id,
    //     //             data: doc.data()
    //     //         }))
    //     //     ));
    //     // return unsubscribe;

    // }, [route]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={90}

                style={styles.container}

            >
                <TouchableWithoutFeedback>
                    <>
                        <ScrollView style={{backgroundColor: 'white', marginTop: 20}}>
                            {/* chat */}
                            {messages.map(({ _id, from, to, message }) => (
                                from === userId ? (
                                    <View key={_id} style={styles.receiver}>
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
                                                uri: 'https://static.remove.bg/remove-bg-web/54743c30904cc98f30bb79359718a5ffd69392cd/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
                                            }}
                                        />
                                        <Text>{message}</Text>
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
                                                uri: 'https://static.remove.bg/remove-bg-web/54743c30904cc98f30bb79359718a5ffd69392cd/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
                                            }}
                                        />
                                        <Text>{message}</Text>
                                    </View>
                                )
                            ))}
                            
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput placeholder="Message" style={styles.textInput}
                                value={input}
                                onChangeText={(text) => setinput(text)}
                                />
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
