import Jwt  from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticate"))
    }

    Jwt.verify(token,process.env.JWT,(err,User)=>{
        if(err) return next(createError(403,"Token is not valid"))
        req.User = User;
        next()
    });
};


export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.User.id === req.params.id){
            next()
        }else{
            if(err) 
                return next(createError(403,"You are not authorized!"))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.User.isAdmin){
            next()
        }else{
            if(err) 
                return next(createError(403,"You are not authorized!"))
        }
    })
}
