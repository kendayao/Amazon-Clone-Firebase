import React, {useEffect} from 'react'
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import Payment from './components/payment/Payment';
import Login from "./components/login/Login"
import "./App.css";
import { Route, Switch} from 'react-router-dom';
import "react-router-dom";
import { auth } from './firebase/firebase';
import {useStateValue} from './contextAPI/StateProvider'
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"

const promise=loadStripe('pk_test_51Hd2wwD99Zg7DoCBCb1teG49Zx498uKexo7gQYEeyCu74jC5zILyS9i36ciltfcaUVMSzAVgQ8rj3bFb1wFgasrW00uILahd67')

function App() {
  const [{}, dispatch]=useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
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
      <Switch>
        <Route path="/checkout">
          <Header />
          <Checkout/>  
        </Route>
        <Route path="/login">
          <Login/>  
        </Route>
        <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
          
        </Route>
        <Route path="/">
          <Header />
          <Home /> 
        </Route>
      </Switch>
    </div>
  );
}

export default App;
