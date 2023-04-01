import express, { NextFunction, Request, Response } from 'express';
import cyber from '../01-utils/cyber';
import verifyLoggedIn from '../02-middleware/verify-logged-in';
import cartLogic from '../05-logic/carts-logic';

const router = express.Router();

router.get(
  '/',
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let authorizationString = request.headers['authorization'];
      const user_id = cyber.getUserFromToken(authorizationString)._id;
      const cart = await cartLogic.getCart(user_id);
      response.json(cart);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/new-cart/',
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let authorizationString = request.headers['authorization'];
      const user_id = cyber.getUserFromToken(authorizationString)._id;
      const cart = await cartLogic.createCart(user_id);
      response.json(cart);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/:_id',
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cart_id = request.params._id;
      let authorizationString = request.headers['authorization'];
      const user_id = cyber.getUserFromToken(authorizationString)._id;
      let cart = await cartLogic.forceNewCart(cart_id, user_id);
      response.json(cart);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
