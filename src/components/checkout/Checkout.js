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
                    src="https://images-na.ssl-images-amazon.com/images/G/01/gift-certificates/consumer/2020/Holiday/GCLPBanners/holi_GCLP_3rd_EN_1024x90_20200918.jpg" 
                    alt="banner ad"
                />
                <div>
                    <h2 className="checkout__title">Your Shopping Basket</h2>
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
            <div className="checkout__right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout
