import React from 'react'
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyB5CzkbA-FFLEAZ1IM83W2acAHcoc_LQV8",
  authDomain: "tackchat-0001.firebaseapp.com",
  projectId: "tackchat-0001",
  storageBucket: "tackchat-0001.appspot.com",
  messagingSenderId: "1073979150190",
  appId: "1:1073979150190:web:75b24b9c2d3d577feb7b7f"
})

const auth = firebase.auth()
const firestore = firebase.firestore()


function App() {
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
    </div>
  );
}

export default App;
