import express, { NextFunction, Request, Response } from 'express';
import { CartItemModel } from '../03-models/cartItem-model';
import cartItemsLogic from '../05-logic/cart-items-logic';

const router = express.Router();

router.get(
  '/:_id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cart_id = request.params._id;
      const cartItems = await cartItemsLogic.getAllItemsFromCart(cart_id);
      response.json(cartItems);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  '/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = new CartItemModel(request.body);
      const addedItem = await cartItemsLogic.addCartItem(item);
      response.json(addedItem);
    } catch (err: any) {
      next(err);
    }
  }
);

router.put(
  '/:_id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item_id = request.params._id;
      const newQuantity = request.body.newQuantity;
      const updatedItem = await cartItemsLogic.updateCartItem(
        item_id,
        newQuantity
      );
      response.json(updatedItem);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  '/:_id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item_id = request.params._id;
      await cartItemsLogic.removeCartItem(item_id);
      response.status(204);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  '/remove-all/:cart_id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cart_id = request.params.cart_id;
      await cartItemsLogic.removeAllItemsFromCart(cart_id);
      response.status(204);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
