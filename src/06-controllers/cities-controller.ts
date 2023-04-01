import express, { NextFunction, Request, Response } from 'express';
import citiesLogic from '../05-logic/cities-logic';

const router = express.Router();

router.get(
  '/cities',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cities = await citiesLogic.getAllCities();
      response.json(cities);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
