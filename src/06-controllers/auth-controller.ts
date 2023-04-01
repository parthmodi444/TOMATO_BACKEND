import express, { NextFunction, Request, Response } from 'express';
import { CredentialsModel } from '../03-models/credentials-model';
import { UserModel } from '../03-models/user-model';
import authLogic from '../05-logic/auth-logic';

const router = express.Router();

router.post(
  '/pre-register',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = request.body.userId;
      const result = await authLogic.isUserIdFree(userId);
      response.json(result);
    } catch (error: any) {
      console.log('Somthing went wrong.. | Pre - Register. Controller. Catch');
      next(error);
    }
  }
);

router.post(
  '/register',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = new UserModel(request.body);
      user.isAdmin = false;
      const token = await authLogic.register(user);
      response.status(201).json(token);
    } catch (error: any) {
      console.log('Somthing went wrong.. | Register. Controller. Catch');
      next(error);
    }
  }
);

router.post(
  '/login',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await authLogic.login(credentials);
      response.json(token);
    } catch (error: any) {
      console.log('Somthing went wrong.. | Login. Controller. Catch');
      next(error);
    }
  }
);

export default router;
