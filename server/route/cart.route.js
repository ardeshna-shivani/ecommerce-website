import express from 'express';
import auth from '../middleware/auth.js';
import { addToCartItemController, deletecartItemQtyController, getCartItemController, updatecartItemQtyController } from '../controllers/cart.controller.js';
const cartRouter = express.Router();

cartRouter.post('/add',auth,addToCartItemController);
cartRouter.get('/get',auth,getCartItemController);
cartRouter.put('/update-qty',auth,updatecartItemQtyController);
cartRouter.delete('/delete-cart-item',auth,deletecartItemQtyController);

export default cartRouter;