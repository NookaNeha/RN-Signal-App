import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBIAsewZc3BzTf1i6iYVu-48ePV-yQabtA",
    authDomain: "rn-signal-c0696.firebaseapp.com",
    projectId: "rn-signal-c0696",
    storageBucket: "rn-signal-c0696.appspot.com",
    messagingSenderId: "231987597544",
    appId: "1:231987597544:web:edfcec5810311d1e53b95d"
  };
let app;
if(firebase.apps.length === 0){
  app=firebase.initializeApp(firebaseConfig);
}
else{
  app=firebase.app();
}
 
const db = app.firestore();
const auth = firebase.auth();

export {db,auth};