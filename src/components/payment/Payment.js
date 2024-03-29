import React, {useState, useEffect} from 'react';
import './Payment.css';
import {useStateValue} from '../../contextAPI/StateProvider';
import CheckoutProduct from '../checkout-product/CheckoutProduct';
import {Link, useHistory} from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from '../../contextAPI/reducer';
import axios from '../../utils/axios'
import {db} from '../../firebase/firebase'

function Payment() {
    const[{basket, user}, dispatch]=useStateValue();
    const history=useHistory();
    
    const stripe=useStripe();
    const elements=useElements();
    const[succeeded, setSucceeded]=useState(false);
    const[processing, setProcessing]=useState("");
    const[error, setError]=useState(null);
    const [disabled, setDisabled]=useState(true);
    const [clientSecret, setClientSecret]=useState(true);

    useEffect(()=>{
    //generate stripe secret that allows us to charge a customer.. anytime basket changes we need a new seccret.

    const getClientSecret=async()=>{
        const response=await axios({
            method: 'post',
            //stripe expects tota in a currency subunit
            url: `/payments/create?total=${getBasketTotal(basket).toFixed(2)*100}`
        });
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
    },[basket])

    const handleChange=event=>{
        // listen for changes in the card details and display any errors as the customer types card details
        setDisabled(event.empty);
        setError(event.error?event.error.message:"")
    }

    const handleSubmit=async event=>{
        event.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{

            //paymentIntent = payment confirmation

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            setSucceeded(true);
            setError(null);
            setProcessing(false)

            dispatch({
                type:'EMPTY_BASKET'
            })

            // history replace because we dont want users to go back to payment page, so we dont use history.push
            history.replace('/orders')
        })
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(basketItem=>(
                            <CheckoutProduct
                                key={basketItem.id}  
                                id={basketItem.id}
                                title={basketItem.title}
                                image={basketItem.image}
                                price={basketItem.price}
                                rating={basketItem.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <p>*Please use the following test credit card for payments*</p>
                            <p>4242 4242 4242 4242 - Exp:04/24 - CVV: 123 ZIP: 12345</p>
                            <div className='payment__priceContainer'>
                                <CurrencyFormat 
                                    renderText={(value)=>(
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing?<p>Processing</p>: "Buy Now"}</span>
                                </button>
                            </div>
                            {error&&<div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment