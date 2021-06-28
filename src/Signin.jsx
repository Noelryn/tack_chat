import React from 'react'

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
    
    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )
}

function ChatRoom() {}

