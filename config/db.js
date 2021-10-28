const mongoose = require("mongoose");
require("dotenv").config();


const connectDB =  mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
    })
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
      console.error(err);
    });

module.exports = connectDB;


