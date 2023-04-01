import express, { NextFunction, Request, response, Response } from 'express';
import cors from 'cors';
import config from './01-utils/config';
import errorsHandler from './02-middleware/errors-handler';
import ErrorModel from './03-models/error-model';
import productsController from './06-controllers/products-controller';
import authController from './06-controllers/auth-controller';
import fileUpload from 'express-fileupload';

import dotenv from 'dotenv';
import dal from './04-dal/dal';
import citiesController from './06-controllers/cities-controller';
import cartController from './06-controllers/cart-controller';
import cartItemsController from './06-controllers/cart-items-controller';
import orderController from './06-controllers/order-controller';
import path from 'path';

dotenv.config(); // Read .env file into process.env
dal.connect();

const server = express();

if (config.isDevelopment) server.use(cors());

server.use(express.json());
server.use(fileUpload());

//expose index.html from 07-frontend directory:
const dir = path.join(__dirname, '07-frontend');
server.use(express.static(dir));
// -------------------------------------------

server.use('/api/auth', authController);
server.use('/api/cities', citiesController);
server.use('/api/products', productsController);
server.use('/api/cart/cart-items', cartItemsController);
server.use('/api/cart', cartController);
server.use('/api/order', orderController);

server.use('*', (request: Request, response: Response, next: NextFunction) => {
  if (config.isDevelopment) {
    next(new ErrorModel(404, 'Route not found.'));
  } else {
    const indexHtmlFile = path.join(__dirname, '07-frontend', 'index.html');
    response.sendFile(indexHtmlFile);
  }
});

server.use(errorsHandler);

server.listen(process.env.PORT, () => {
  console.log(`Server rolling on port - ${process.env.PORT}...`);
});
