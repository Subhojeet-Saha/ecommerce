import express from "express";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authhelper.js";
import JWT from "jsonwebtoken"


export const registerController= async(req,res) => {
    try {
        const {name,email,password,phone,address}= req.body
       
        //validation

        if(!name)
        {
            return res.send({message:"name is required"})
        }
        if(!email)
        {
            return res.send({message:"email is required"})
        }
        if(!password)
        {
            return res.send({message:"password is required"})
        }
        if(!phone)
        {
            return res.send({message:"phone is required"})
        }
        if(!address)
        {
            return res.send({message:"address is required"})
        }

        const existingUser=await userModel.findOne({email})
        


        if(existingUser)
        {
           return res.status(200).send({
                success:false,
                message:"Already registered please login"
            })
        }

        const hashedPassword=await hashPassword(password)
        console.log(hashedPassword)

        const user=await new userModel({name,email,phone,address,password:hashedPassword})

        user.save()

        res.status(201).send({
            success:true,
            message:"user registration success",
            user
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in registration",
            error
        })
    }
}

export const loginController=async (req,res) =>{

    try {
        const {email,password}=req.body

        if( !email || !password)
        {
            res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }

        //check user
        const user =await userModel.findOne({email})

        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"not a registered user"
            })
        }
        console.log()
        const match=await comparePassword(password,user.password);
        if(!match)
        {
            return res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }

        const token=JWT.sign({_id:user._id},process.env.JWT_SECRET,
            {
        expiresIn:'7d'
    })

    res.status(200).send({
        success:true,
        message:"login succesful",
        user:{
            name:user.name,
            email:user.email,
            address:user.address
        },
        token,
    })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}

export const signInController=async (req,res)=>{
    res.send("got")
}