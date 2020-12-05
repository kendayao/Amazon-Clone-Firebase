import React from 'react';
import './Checkout.css';
import CheckoutProduct from '../checkout-product/CheckoutProduct'
import Subtotal from "../subtotal/Subtotal"
import {useStateValue} from '../../contextAPI/StateProvider'



function Checkout() {
    const[{basket}, dispatch]=useStateValue();
    console.log({basket})
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" 
                    src="https://m.media-amazon.com/images/S/sonata-images-prod/US_HOL20_Acquisition_Evergreen/816d73ff-05e2-4a1f-a028-3b4a953e2d16._UR3000,600_SX1500_FMjpg_.jpg" 
                    alt="banner ad"
                />
                <div>
                    <h2 className="checkout__title">Your Shopping Basket</h2>
                        {basket.map(basketItem=>(
                            <CheckoutProduct  
                            key={basketItem.id}
                            title={basketItem.title}
                            image={basketItem.image}
                            price={basketItem.price}
                            rating={basketItem.rating}
                            />
                        ))}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout
