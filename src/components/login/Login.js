import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import './Login.css'
import {auth} from '../../firebase/firebase'

function Login() {
    const history=useHistory();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const signIn=(event)=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(auth=>{
           history.push('/')
            
        }).catch(error=>alert(error.message))
    }

    const register=event=>{
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((auth)=>{

            if (auth){
                history.push('/')
            }
        
        })
        .catch(error=>alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='logo'/>
            </Link>
            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={(event)=>setEmail(event.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={(event)=>setPassword(event.target.value)} />
                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>
                <p>By signing-in you agree to Amazon's-Clone Conditions of Use & Sale.
                    Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
                </p>
                <button onClick={register} className='login__registerButton'>Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login
