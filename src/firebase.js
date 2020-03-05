import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyCwpw1zVP8YHts7m3L_iseg-BoRZin4IdQ",
    authDomain: "reactapp-a4ff9.firebaseapp.com",
    databaseURL: "https://reactapp-a4ff9.firebaseio.com",
    projectId: "reactapp-a4ff9",
    storageBucket: "reactapp-a4ff9.appspot.com",
    messagingSenderId: "128526667264",
    appId: "1:128526667264:web:829f2ab75db214074092e5",
    measurementId: "G-RJC81DH63X"
  };

class Firebase{

    constructor(){
        app.initializeApp(firebaseConfig);

        //setting the reference to the database for being available 
        this.app = app.database();
        //storage
        this.storage = app.storage();
    }

    login(email,password){
        return app.auth().signInWithEmailAndPassword(email , password);
    };

    logout(){
        return app.auth().signOut();
    }
    
    async register(name, email , password){
       await app.auth().createUserWithEmailAndPassword(email, password);
       const uid = app.auth().currentUser.uid;
       return app.database().ref('users').child(uid).set({
           name: name
       })
    }

    isInizialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve)
        })
    }

    getCurrentUser(){
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }
        
        const uid = app.auth().currentUser.uid;
        await app.database().ref('users').child(uid).once('value').then(callback);
    }
}

export default new Firebase();