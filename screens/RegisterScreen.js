import React,{useState,useLayoutEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,KeyboardAvoidingView } from 'react-native'
import {Button,Input,Image,Text} from 'react-native-elements'
import { auth } from '../firebase';


const RegisterScreen = ({navigation}) => {
    
    const [name, setName] = useState('');
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState("")

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:" Back to Login"  
        
        })
    },
    [navigation])

    const register=()=>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL : imageUrl || "https://banner2.cleanpng.com/20180714/fok/kisspng-computer-icons-question-mark-clip-art-profile-picture-icon-5b49de29708b76.026875621531567657461.jpg"
            })
        }).catch(error =>alert(error.message))
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style= "light" />
        <Text h3 style={{marginBottom:50,marginTop:20}}>Create a signal account</Text>
        <Image source={{uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"}}
        style={{width:200,height:200}}
        />
        <View style={styles.inputContainer}>
            <Input placeholder="Full Name" autofocus type="text" 
            value={name} onChangeText={text => setName(text)}
            />
            <Input placeholder="Email"  type="email" 
            value={email} onChangeText={text => setEmail(text)}
            />
            <Input placeholder="Password"  type="text" 
            value={password} secureTextEntry onChangeText={text => setPassword(text)}
            />
            <Input placeholder="Profile Picture Url (optional)"  type="text"
             value={imageUrl} onChangeText={text => setImageUrl(text)}
             onSubmitEditing={register}
            />
        </View>
        <Button title="Register" raised containerStyle={styles.button}  onPress= {register} />
        <Button title="Login" type="outline" containerStyle={styles.button} onPress={
            ()=>navigation.navigate("Login")
            } />
        <View style={{height:100} }/>
    </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    inputContainer: {
        width: 300
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        backgroundColor:"white"
    },
    button: {
        width: 200,
        marginTop: 10
    }
})

