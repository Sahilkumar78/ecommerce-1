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
       
    try {
        
     const {search, category} = req.query; // it reads optional parameters from url
     let filter= {};

     if(search){
         filter.name= {
            $regex: search, // regex search for text matching a pattern
            $options: "i" // makes the search case-insensitive
         }
     }
       
     if(category){
         filter.category= category
     }

     const products = await Product.find(filter)
                          .sort({createdAt: -1});
//  Sorts products by creation date, newest first.
// - -1 means descending order.
// - 1 means ascending order.

   return res.status(200).json({
      count: products.length,
      products
   })

    } catch (error) {
        console.log("Error while getting all products: ", error);
        return res.status(500).json({
            message :"Internal server error"
        })
    }
}


// update product

const updateProduct= async (req, res) => {
       
      try {
        
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
             throw new Error("product not found");
        }

        return res.status(200).json({
            message: "Product updated successfully",
            product
        })


      } catch (error) {
        console.log("Error while updating product: ", error);
        return res.status(500).json({
            message: "Internal server error"
        })
        
      }
}


// delete product

const deleteProduct= async (req, res) => {
      
    try {

        const {id} = req.params;

      const product=  await Product.findByIdAndDelete(id);

      if(!product){
         throw new Error("product not found");
      }

      return res.status(200).json({
        message: "product delete successfully",
        product
      })
        
    } catch (error) {
        console.log("Error while deleting product: ", error);
        return res.status(500).json({
             message: "Internal server error"
        })
    }
}


export {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
}