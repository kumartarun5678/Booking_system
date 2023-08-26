import express  from "express";
import { deleteUser, getUser, getUsers, updateuser } from "../controllers/user.js ";
import { verifyAdmin, verifyToken,verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentivation",verifyToken, (req,res,next)=>{
//     res.send("Hello user , you are logged in")
// })

// router.get("/checkuser/:id", verifyUser,(req,res,next)=>{
//     res.send("Hello user , you are logged in and your account has been successfully deleted your account")
// })

// router.get("/checkAdmin/:id", verifyAdmin,(req,res,next)=>{
//     res.send("Hello user , you are logged in and your account has been successfully deleted your all account")
// })

//UPDATE
router.put("/:id",verifyUser,updateuser);
//DELETE
router.delete("/:id",verifyUser,deleteUser);
//GET
router.get("/:id",verifyUser,getUser);
//GET ALL
router.get("/",verifyAdmin,getUsers);
 
export default router;