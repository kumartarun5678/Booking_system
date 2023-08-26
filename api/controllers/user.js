import hotel from "../models/hotel.js";



export const updateuser = async (req,res,next)=>{
    try{
        const updateUser = await hotel.findByIdAndUpdate(req.params.id,{$set:req.body},
        {new:true}
        );
        res.status(200).json(updateUser)
    }
    catch(err){
        next(err);
    }
    
}
export const deleteUser = async (req,res,next)=>{
    try{
        await hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted sucessfully")
    }
    catch(err){
       next(err);
    }      
  
};
export const getUser = async (req,res,next)=>{
    try{
        const user = await hotel.findById(req.params.id);
        res.status(200).json(user)
    }
    catch(err){
        next(err);
    }
    
};
export const getUsers = async (req,res,next)=>{
         try{
        const users = await hotel.find();
        res.status(200).json(users)
    }
    catch(err){
        next(err)
    }
}  