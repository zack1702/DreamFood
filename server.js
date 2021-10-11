const express= require('express')
const app=express()
const morgan= require('morgan')
const multer = require("multer");
const cors =require('cors')
const CategoryRoute=require('./routes/CategoryRoutes')
const ProductRoute=require('./routes/ProductRoutes')
const FilterRoute=require('./routes/FilterRoutes')
const AuthRoutes=require('./routes/AuthRoutes')
const UserRoute=require('./routes/UserRoutes')
const PostRoute=require('./routes/PostRoutes')
const ConversationRoute=require('./routes/ConversationRoutes')
const MessageRoute=require('./routes/MessageRoutes')
const CartRoute=require('./routes/CartRoute')
const cookieParser= require('cookie-parser')
const connectDB=require('./config/db')
//const morgan = require('morgan')
connectDB;
app.use(cors());
//app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

//  get access to images in uploads folder middleware/express.static('file') path/uploads,
app.use('/uploads',express.static('uploads'))

app.use('/api/auth',AuthRoutes)
app.use('/api/user',UserRoute)
app.use('/api/category',CategoryRoute)
app.use('/api/product',ProductRoute)
app.use('/api/filter',FilterRoute)
app.use('/api/cart',CartRoute)

app.use("/api/posts", PostRoute);
app.use("/api/conversations", ConversationRoute);
 app.use("/api/messages", MessageRoute);




const port= process.env.PORT|| 5000;
app.listen(port,()=>console.log(`server listening on ${port}`))