require("dotenv").config();
const express = require("express")
const bp = require('body-parser')
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB = require("./database/connectDB")
const postRouter = require("./routes/post")
const app = express();

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get("/", (req,res) => res.send("code with ibo"))
app.use("/posts", postRouter); 
let port = process.env.PORT || 3000;

let start = async() => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(port, () => (console.log(`port ${port} is listening successfuly...`)))        
    } catch (error) {
        console.log(error)
    }
};

start()