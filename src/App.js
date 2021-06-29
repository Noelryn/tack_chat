import React, { useState } from 'react'
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

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header>
       <h1>Tack-Chat</h1>
       <SignOut />

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)

  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('creatAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})
  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {

    e.preventDefault()

    const { uid } =auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid
    })

    setFormValue('')
  }

  return (
    <>
      <div>
        { messages && messages.map(msg => <ChatMessage Key={msg.id} message={msg} />)}
      </div>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type="submit"> Submit</button>

      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recevied'

  return ( 
   <div className={`message ${messageClass}`}>
    <p>{text}</p>
   </div>
     
  )

}


export default App;
