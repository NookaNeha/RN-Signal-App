import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem,Avatar} from 'react-native-elements'

const CustomListItem = ({id,chatName,enterChat}) => {
    return (
        <ListItem onPress={()=>{enterChat(id,chatName)}} key={id} bottomDivider >
            <Avatar 
            rounded
            source={{
                uri:"https://banner2.cleanpng.com/20180714/fok/kisspng-computer-icons-question-mark-clip-art-profile-picture-icon-5b49de29708b76.026875621531567657461.jpg"
            }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                   {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} 
                ellipsizeMode="tail">
            ABC
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
