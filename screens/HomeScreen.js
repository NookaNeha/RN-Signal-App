import React,{useLayoutEffect,useState,useEffect} from 'react'
import { StyleSheet, Text, View,SafeAreaView ,ScrollView,TouchableOpacity,Alert } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomListItem from '../components/CustomListItem'
import {auth,db} from "../firebase"
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
const HomeScreen = ({navigation}) => {

    const [chats,setChats]= useState([])

    const signOutUser = ()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }
    const enterChat = (id,chatName)=>{
        navigation.navigate("Chat",{
            id,
            chatName
        })
    }
    useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot( snapshot => (
        setChats(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
        })))
    ))
    return unsubscribe;
    }, [])

  useLayoutEffect(() => {
        navigation.setOptions({
            title:"Signal",
            headerStyle:{
                backgroundColor:"#fff"
            },
            headerTitleStyle:{color:"black"},
            headerTintColor:{color:"black"},
            headerLeft : ()=>(
                <View style={{marginLeft:20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress= {
                () =>  Alert.alert(
                    "Alert Title")
            }>
                    <Avatar rounded source={{uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight : ()=>(
                <View 
                style={{marginRight:20,
                    width:80,
                    justifyContent:'space-between',
                    flexDirection:'row'
                
                }}>
                    <TouchableOpacity activeOpacity={0.5}
                    //  onPress={signOutUser}
                     >
                   <AntDesign  name="camerao" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} 
                     onPress={()=>
                         navigation.navigate("AddChat")
                     }
                    >
                   <SimpleLineIcons  name="pencil" size={18} color="black" />
                    </TouchableOpacity>

                </View>
            ),
        });
    }, [navigation])
    return (
        <SafeAreaView>
           <ScrollView>
               {chats.map(({id,data:{chatName}})=>(
                <CustomListItem id={id} chatName={chatName} key={id} enterChat={enterChat} />
               ))}
    
            </ScrollView>
        </SafeAreaView>
    )
    
}



export default HomeScreen

const styles = StyleSheet.create({})
