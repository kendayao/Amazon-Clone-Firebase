import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import './Orders.css'
import {useStateValue} from '../../contextAPI/StateProvider'
import OrderItem from '../order-item/OrderItem'

function Orders() {
    const[{basket, user}, dispatch]=useStateValue();
    const [orders, setOrders]=useState([])

    useEffect(()=>{
        if(user){
            db.collection('users').doc(user?.uid).collection('orders').orderBy('created', 'desc')
            .onSnapshot(snapshot=>(
            setOrders(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            })))))
        }else{
            setOrders([])
        }
    },[user])
    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className='orders_order'>
                {orders?.map(order=>(
                    <OrderItem order={order}/>
                ))}
            </div>

        </div>
    )
}

export default Orders
