import mongoose from "mongoose";
import { Address } from "../models/address";


 // save address 
const saveAddress = async (req, res) => {
     
    try {
        
        const {
              userId,
            fullName,
            phone,
            addressLine,
            city,
            state,
            pincode
        } = req.body;

    const address= await Address.create({
              userId,
            fullName,
            phone,
            addressLine,
            city,
            state,
            pincode
        })

        return res.status(201).json({
            message: "address save",
            address
        })

    } catch (error) {
        console.log("Error while saving address: ", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}

 // get address

 const getAddress = async (req, res) => {
     
      try {
            const {userId} = req.params;

     const address=  await Address.find({userId});
     if(address.length ===0){
         return res.status(404).json({
            message: "no address found for this user"
         })
     }

     return res.status(200).json({
        message: "Address fetched successfully",
        address
     })


      } catch (error) {
        console.log("Error while getting address: ", error);
        return res.status(500).json({
             message: "Internal server error"
        })
      }
 }

 export {
    saveAddress,
    getAddress
 }