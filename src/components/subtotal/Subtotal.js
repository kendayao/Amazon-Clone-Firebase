import React from 'react'
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import {useStateValue} from '../../contextAPI/StateProvider';
import {getBasketTotal} from '../../contextAPI/reducer';
import {useHistory} from 'react-router-dom'

function Subtotal() {
    const history=useHistory();
    const [{user, basket}, dispatch]=useStateValue();
    console.log(getBasketTotal(basket).toFixed(2))
    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value)=>(
                    <>
                    <p>
                        Subtotal ({basket.length} items): <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox"/>This order contains a gift
                    </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={"$"}
            
            
            />
            {user?<button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>:
             <button disabled>Sign In to Checkout</button>}
        </div>
    )
}

export default Subtotal
