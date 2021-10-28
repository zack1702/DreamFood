const express= require('express')
const app=express()
const morgan= require('morgan')
const multer = require("multer");
const fileupload = require("express-fileupload");
 const path=require('path')
const cors =require('cors')
const CategoryRoute=require('./routes/CategoryRoutes')
const ProductRoute=require('./routes/ProductRoutes')
const FilterRoute=require('./routes/FilterRoutes')
const CartRoute=require('./routes/CartRoute')

const AuthRoutes=require('./routes/AuthRoutes')
const UserRoute=require('./routes/UserRoutes')
const PostRoute=require('./routes/PostRoutes')
const ConversationRoute=require('./routes/ConversationRoutes')
const MessageRoute=require('./routes/MessageRoutes')

const OrderRoute=require('./routes/OrderRoute')
const cookieParser= require('cookie-parser')
const connectDB=require('./config/db')
//const morgan = require('morgan')
connectDB;
app.use(cors());
//app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:3000/", credentials: true }));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
 });


//depolyement
 if(process.env.NODE_ENV==="production"){
     app.use(express.static(path.join(__dirname,"/client/build")))
     app.get('*',(req,res)=>{
         res.sendFile(path.join(__dirname,'/client/build','index.html'))
     })
 }else{
     app.get('/',(req,res)=>{
         res.send('Api running')

     })
 }
 // get access to images in uploads folder middleware/express.static('file') path/uploads,
app.use('/uploads',express.static('uploads'))

app.use('/api/auth',AuthRoutes)
app.use('/api/user',UserRoute)


app.use('/api/category',CategoryRoute)
app.use('/api/product',ProductRoute)
app.use('/api/filter',FilterRoute)
 app.use('/api/cart',CartRoute)
app.use('/api/order',OrderRoute)

 app.use("/api/posts", PostRoute);
app.use("/api/conversations", ConversationRoute);
 app.use("/api/messages", MessageRoute);




const port= process.env.PORT|| 5000;
app.listen(port,()=>console.log(`server listening on ${port}`))