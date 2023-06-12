import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";


export const requireSignIn= async (req,res,next) =>{
    console.log(req.headers)
    // next();
    try {
        const decode=JWT.verify(req.headers.authorization,
            process.env.JWT_SECRET);
            req.user=decode;
            next();
    } catch (error) {
        console.log(error)
    }
}

export const isAdmin = async (req,res,next)=>{
   try {
    const admin=await userModel.findById(req.user._id);
    if(admin.role!==1){
        res.status(401).send({
            success:false,
            message:"not admin"
        })
    }else{
        next()
    }
   } catch (error) {
    console.log(error)
   }
}