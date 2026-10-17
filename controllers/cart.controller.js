import { Cart } from "../models/cart.js";


// add to cart 

const addToCart = async (req, res) => {
       
     try {
        
      const {userId, productId} = req.body;
     let cart= await Cart.findOne(userId);
     if(!cart){ // no product found
         cart = await Cart.create({
            userId,
            items: [{productId, quantity: 1}]
         })
     }else{
         const item = cart.items.find(
            (item) => items.productId.toString() === productId
         )
         if(item){
             item.quantity++;
         }else{
             cart.items.push({productId, quantity:1})
         }

        await cart.save();
     }

     return res.status(201).json({
        message: "item added to cart successfully",
        cart
     })

     } catch (error) {
        console.log("Error while adding to cart is: ", error);
        return res.status(501).json({
            message: "Internal server error"
        })
        
     }
}


// remove from cart

const removeFromCart = async (req, res) => {
     
    try {
        
        const {userId, productId} = req.body;

      const cart = await Cart.findOne(userId);
      if(!cart){
         return res.status(404).json({
            message: "Cart not found"
         })
      }
      
   cart.items= cart.items.filter(
        (item) => item.productId != productId)
      
   await cart.save();

   return res.status(200).json({
    message: "item deleted successfully",
    cart
   })

    } catch (error) {
        console.log("Error while removing item from cart: ", error);
         return res.status(500).json({
            message: "Internal server error"
         })
    }
}


// update item quantity in cart 

const updateItem = async (req, res) => {
     
    try {
        
         const {productId, userId, quantity} = req.body;
       
       const cart = await Cart.findOne({userId});

       if(!cart){
          return res.status(404).json({
            message: "cart not found"
          })
       }
    
       const item = cart.items.find(
        (item) => item.productId.toString() === productId
       )
      
      item.quantity = quantity;
      await cart.save();
      
      return res.status(200).json({
        message: "item updated successfully",
        cart
      })

    } catch (error) {
        console.log("Error while updating item: ", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


// get cart by user id

const cartByUserId = async ( req, res) => {
     
    try {
        
        const {userId} = req.body;
      
    const cart =await Cart.findOne(userId).populate("items.productId")
    if(!cart){
         return res.status(404).json({
            message: "cart not found"
         })
    }

    return res.status(200).json({
        message: "got cart successfully by user id",
        cart
    })

    } catch (error) {
        console.log("Error while getting cart by user Id: ", error);
        return res.status(500).json({
            message: 'Internal server error'
        }) 
    }
}


export {
     addToCart,
     removeFromCart,
     updateItem,
     cartByUserId
}