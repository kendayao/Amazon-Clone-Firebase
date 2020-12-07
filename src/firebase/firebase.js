import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAZBh6oMUj7xrR3l3Sbh1OwqAO8mxWSkzI",
    authDomain: "clone-5eb64.firebaseapp.com",
    projectId: "clone-5eb64",
    storageBucket: "clone-5eb64.appspot.com",
    messagingSenderId: "1084874216999",
    appId: "1:1084874216999:web:b6d49072785eed9e7f6002",
    measurementId: "G-4EF3B3X830"
  };


  const firebaseApp=firebase.initializeApp(firebaseConfig)

  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {db, auth};