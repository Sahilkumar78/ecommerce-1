import mongoose from "mongoose";



// register 
const registerUser= async () => {
      
     const {name, email, password} = req.body;

     if(!name || !email || !password){
         throw new Error("all fields are required");
     }

     // password hashed

     // 
}


// login


