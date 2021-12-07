import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';

export default function Customlistitem({id,chatName,enterChat}) {
    return (
        <ListItem onPress={()=>enterChat(id,chatName)} key={id} bottomDivider >
            <Avatar
                rounded
                source={{
                    uri:
                        "https://cdn-icons-png.flaticon.com/512/906/906362.png",

                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'800'}}>
                  {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                 numberOfLines={1} 
                 ellipsizeMode="tail">
                     this is testing text

                </ListItem.Subtitle>

            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({})
