import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView,KeyboardAvoidingView,Platform,TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import {AntDesign,FontAwesome,Ionicons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import { db,auth } from '../firebase';
import * as firebase from "firebase"
const ChatScreen = ({navigation,route}) => {

    const [input, setInput]=useState("")
    const [messages, setMessages]=useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"chat",
           headerTitleAlign:"left",
           headerBackTitleVisible:false,
           headerTitle:()=>(
               <View style={{
                   flexDirection:'row',
                   alignItems:"center"
               }}>
                   <Avatar rounded source={{uri:"https://banner2.cleanpng.com/20180714/fok/kisspng-computer-icons-question-mark-clip-art-profile-picture-icon-5b49de29708b76.026875621531567657461.jpg"}}/>
                  <Text  style={{color:"white", marginLeft:10, fontWeight:"700"}}> 
                     
                       {route.params.chatName}</Text>
               </View>
           ),
           headerLeft:()=>(
               <TouchableOpacity
               style={{marginLeft:10}}
               onPress={navigation.goBack}
               >
                   <AntDesign name="arrowleft" size={24} color='white' />
               </TouchableOpacity>
           ),
           headerRight:()=>(
               <View style={{
                   flexDirection:'row',
                   justifyContent:'space-between',
                   width:80,
                   marginRight:20
               }}>
            <TouchableOpacity
            style={{marginLeft:10}}
            onPress={navigation.goBack}
            >
                <FontAwesome name="video-camera" size={24} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
            style={{marginLeft:10}}
            onPress={navigation.goBack}
            >
                <Ionicons name="call" size={24} color='white' />
            </TouchableOpacity>
               </View>
            
        )
        })
    }, [navigation])
useLayoutEffect(()=>{
    const unsubscribe= db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>{
        setMessages(
            snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            }))
        )

    })
    return unsubscribe;
},[route])
    
const  sendMessage=()=>{
    db.collection('chats').doc(route.params.id).collection('messages').add({
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        message :input,
        displayName:auth.currentUser.displayName,
        email:auth.currentUser.email,
        photoURL:auth.currentUser.photoURL,
    })
setInput('')
}



    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor:"white"
        }}>
            <StatusBar style="light" />
           <KeyboardAvoidingView
           behavior={Platform.OS === "ios" ? "padding" : "height"}
           style={styles.container}
           keyboardVerticalOffset={90} 
           >
               <TouchableWithoutFeedback onPress={ Keyboard.dismiss()}> 
               <>
               <ScrollView>
                   {messages.map(({id,data})=>(
                       data.email===auth.currentUser.email ? 
                       <View key={id} style={styles.receiver}>
                           <Avatar />
                           <Text style={styles.receiverText}>{data.message}</Text>
                       </View>
                       :
                       <View style={styles.sender}>
                           <Avatar />
                           <Text style={styles.senderText}>{data.message}</Text>
                       </View>
                   ))}
               </ScrollView>
               <View style={styles.footer}>
                   <TextInput 
                   placeholder="signal message"
                   style={styles.textInput}
                   value={input}
                   onChangeText={text=>{setInput(text)}}
                   onSubmitEditing={sendMessage}
                   />
                   <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                    <Ionicons name="send" size={24} color="#2B68E6" />
                   </TouchableOpacity>
               </View>
               </>
               </TouchableWithoutFeedback>
           </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    footer:{
        flexDirection:'row',
        alignItems:"center",
        width:"100%",
        padding:15
    },
    textInput:{
        bottom:0,
        flex:1,
        height:40,
        borderWidth:1,
        marginRight:15,
        borderColor:"transparent",
        padding:10,
        color:"grey",
        borderRadius:30,
        backgroundColor:"#ECECEC"
    },
    receiverText:{},
    senderText:{},
    receiver:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    sender:{}
})

