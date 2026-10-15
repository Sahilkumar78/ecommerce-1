import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {User} from "../models/user.js"


// register 
const registerUser= async (req, res) => {
      
       try {

        const {name, email, password} = req.body;

     if(!name || !email || !password){
         throw new Error("all fields are required");
     }
     
     const userExists = await User.findOne({email});
     if(userExists){
        return res.status(400).json({message: "User already exists"});
     }
    

     // password hashed
     const hashedPassword = await bcrypt.hash(password, 10);

     // create user
   const newUser=  await User.create({
         name,
         email,
         password:hashedPassword
     })

    return res.status(201).json({
        message: "User registeres successfully",
        user: {
             id: newUser._id,
             name: newUser.name,
             email: newUser.email
        }
    })
        
       } catch (error) {
           console.log("Error while creating user is: ", error);
           return res.status(500).json({
            message: "server error"
           })
       }
}


// login

const loginUser = async (req, res) => {
        
      try {
        
       // get data from user

    const {name, email, password} = req.body;
     
    if(!name || !email|| !password){
         throw new Error("All fields are required");
    }

    // find user by email
    const user=  await User.findOne({email});
       
     if(!user){
         return res.status(400).json({
            message: "invalid email or password"
         })
       }

    // compare password 
   const isPasswordCorrect= await bcrypt.compare(password, user.password);

   if(!isPasswordCorrect){
      return res.status(400).json({
        message: "Invalid email or passowrd"
      })
   }

    // generate jwt 

    const token= jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
     )

    // send response
     return res.status(200).json({
        message: "user login successfully",
        user: {
             id: user._id,
             name: user.name,
             email: user.email
        }
     })


      } catch (error) {
          console.log("Error while login user is: ", error);
          return res.status(500).json({
            message: "internal server error"
          })
          
      }
}




export {
    registerUser,
    loginUser
}

