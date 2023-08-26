import room from "../models/room.js";

import hotel from "../models/hotel.js";
import {createError} from "../utils/error.js"

export const createRoom =async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom =new room(req.body);

    try{
        const saveRoom = await newRoom.save();
        try{
            await hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms:saveRoom._id},
            });
        }
        catch(err){
            next(err);
        }
        res.status(200).json(saveRoom)
    }catch(err){
        next(err)
    }
};

export const updateRoom = async (req,res,next)=>{
    try{
        const updateRoom = await hotel.findByIdAndUpdate(req.params.id,{$set:req.body},
        {new:true}
        );
        res.status(200).json(updateRoom)
    }
    catch(err){
        next(err);
    }
    
}
export const updateRoomAvailability = async (req,res,next)=>{
    try{
        await room.updateOne({"roomNumber._id":req.params.id},
        {
        $push:{
            "roomNumbers.$.unavailableDates": req.body.dates
        },
        });
        res.status(200).json(updateRoom)
    }
    catch(err){
        next(err);
    }
    
}
export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    try{
        await hotel.findByIdAndUpdate(hotelId,{
            $pull:{rooms:req.params.id},
        });
    }
    catch(err){
        next(err);
    }
    try{
        await room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room has been deleted sucessfully")
    }
    catch(err){
       next(err);
    }      
  
};
export const getRoom = async (req,res,next)=>{
    try{
        const Room = await room.findById(req.params.id);
        res.status(200).json(Room)
    }
    catch(err){
        next(err);
    }
    
};
export const getRooms = async (req,res,next)=>{
         try{
        const Rooms = await room.find();
        res.status(200).json(Rooms)
    }
    catch(err){
        next(err)
    }
}