import React, {useEffect} from 'react'
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/login/Login"
import "./App.css";
import { Route, Switch, Redirect} from 'react-router-dom';
import "react-router-dom";
import { auth } from './firebase/firebase';
import {useStateValue} from './contextAPI/StateProvider'

function App() {
  const [{}, dispatch]=useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log(authUser)
      if(authUser){
        dispatch({
          type:'SET_USER',
          user: authUser
        })
       
      }else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })


  },[])

  return (
    <div className="app">
        <Route exact path="/">
          <Header />
          <Home /> 
        </Route>
        <Route exact path="/checkout">
          <Header />
          <Checkout/>  
        </Route>
        <Route exact path="/login">
          <Login/>  
        </Route>
    </div>
  );
}

export default App;
