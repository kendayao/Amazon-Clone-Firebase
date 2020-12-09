require('dotenv').config()

const functions = require('firebase-functions');
const express=require("express");

const cors=require("cors");

const stripe=require("stripe")(process.env.SECRET_KEY)

//API
//App config
const app=express();


//Middlewares
app.use(cors({origin: true}));
app.use(express.json());
//API routes
app.get('/',(request, response)=>response.status(200).send('hello world'))

app.post('/payments/create', async(request, response)=>{
    const total=request.query.total;
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency: "usd"
    })
    //OK reponse-created payment intent
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})

//Listen
exports.api=functions.https.onRequest(app)

//example endpoint
//http://localhost:5001/clone-5eb64/us-central1/api