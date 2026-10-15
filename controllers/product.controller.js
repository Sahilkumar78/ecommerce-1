import mongoose from "mongoose";
import { Product } from "../models/product.js";



// create product

const createProduct = async (req, res) => {
     
     try {
         
         const {name, description, price, category, image,stock} = req.body;

    if(!name || !description || !price || !category || !image|| !stock){
         throw new Error("All fields are required");
    }
    
  const product=  await Product.create({
        name, description, price, category, image,stock
    })

    return res.status(201).json({
        message: "Product created successfully",
        product
    })


     } catch (error) {
         console.log("Error while creating product: ", error);
         return res.status(500).json({
            message: "internal server error"
         })        
     }

}


// get all products 

const getAllProducts= async (req, res) => {
     
      const {id} = req.params;

       await Product.findById(id)
}


// update product

const updateProduct= async (req, res) => {
       
     const {id } = req.params;
     const {
            name,
            description,
            price,
            category,
            image,
            stock
        } = req.body;

      const product=  await Product.findByIdAndUpdate(
            id, 
            {
            name,
            description,
            price,
            category,
            image,
            stock
            },
            {
                new :true,
                runValidators: true
            }
        )

        if(!product){
             return res.status(404).json({
                message: "Product not found"
             })
        }

        return res.status(200).json({
            message: "Product updated successfully",
            product
        })

}


// delete product


export {
    createProduct
}