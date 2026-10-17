

// place order

import { Cart } from "../models/cart";
import { Order } from "../models/order";
import { Product } from "../models/product";

const placeOrder = async (req, res) => {
     
      try {
        
        const {userId, address} = req.body;

     // get cart 
    const cart= await Cart.findOne({userId}).populate("items.productId");
    
    if(!cart || cart.items.length ===0){
         return res.status(400).json({
            message: "Cart is empty"
         })
    }

    let totalAmount =0;
    let orderItems= [];
    
    for(let item of cart.items){
         let product= item.productId

         orderItems.push({
            productId: productId._id,
            quantity: item.quantity,
            price: product.price
         })

         totalAmount += product.price * item.quantity

         // reduce stock

        await Product.findByIdAndUpdate(product._id, {
            $inc: {stock: -item.quantity}
        })
    }

    const order =await Order.create({
        userId,
        items,
        address,
        totalAmount,
        paymentMethod: "COD"
    })
   
    cart.items= []
    await cart.save();

    return res.status(201).json({
        message: "order placed successfully",
        orderId: order._id
    })

      } catch (error) {
        console.log("Error while placing order: ", error);
        return res.status(500).json({
            message:" Internal server error"
        }) 
      }
}

export {placeOrder}