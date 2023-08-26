import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouts from "./routes/auth.js";
import usersRouts from "./routes/users.js";
import hotelsRouts from "./routes/hotels.js";
import roomsRouts from "./routes/rooms.js";
import cookieParser from "cookie-parser";

import cors from "cors"

const app =express();
dotenv.config()

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connect to mongodb")
    }catch(error){
        throw error;
    }
};


mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB is disconnected!")
})

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB is connected!")
})


//Middlewares

app.use(cors())

app.use(cookieParser())

app.use(express.json());

app.use("/api/auth",authRouts);

app.use("/api/users",usersRouts);

app.use("/api/hotels",hotelsRouts);

app.use("/api/rooms",roomsRouts);

app.use((err,req,res,next)=>{
    const errorStatus = err.status ||500;
    const errorMessage = err.message || "Something went to wrong";
   return res.status(errorStatus).json({
    success:false,
    status:errorStatus, 
    message:errorMessage,
    stack:err.stack,
   });
});
// app.get("/",(req,res)=>{
//     res.send("Hello First Request!")
// })


// app.get("/register",(req,res)=>{
//     res.send("Hello ,this is register auth endpoint");
// })

// app.get("/",(req,res)=>{
//     res.send("Hello First Request!")
// })




app.listen(8000,()=>{
    connect()
    console.log("Connected to backend !"); 
})