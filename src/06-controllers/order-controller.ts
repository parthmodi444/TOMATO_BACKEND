import express, { NextFunction, Request, Response } from 'express';
import cyber from '../01-utils/cyber';
import verifyLoggedIn from '../02-middleware/verify-logged-in';
import { OrderModel } from '../03-models/order-model';
import ordersLogic from '../05-logic/orders-logic';

const router = express.Router();

router.get(
  '/cities/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let cities = await ordersLogic.getCities();
      response.json(cities);
    } catch (err: any) {
      next(err);
    }
  }
);
router.get(
  '/number-of-orders/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let numerOfOrders = await ordersLogic.getNumberOfOrders();
      response.json(numerOfOrders);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/last-order/',
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let authorizationString = request.headers['authorization'];
      const user_id = cyber.getUserFromToken(authorizationString)._id;

      let lastOrder = await ordersLogic.getLastOrder(user_id);
      response.json(lastOrder);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  '',
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const order = new OrderModel(request.body);
      let orderResponse = await ordersLogic.addOrder(order);
      response.json(orderResponse);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  '/check-date/',
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const date = request.body.date;
      let isDateBad = await ordersLogic.checkDate(date);

      response.json(isDateBad);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
