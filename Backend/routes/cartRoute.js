import express from 'express';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController';

const cartRouter = express.Router();

cartRouter.post('/add', addToCart)
cartRouter.delete('/remove', removeFromCart)
cartRouter.get('/get', getCartItems)

export default cartRouter