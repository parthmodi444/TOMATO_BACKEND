import express, { NextFunction, Request, Response } from 'express';
import productsLogic from '../05-logic/products-logic';
import path from 'path';

const router = express.Router();

router.get(
  '/categories/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categories = await productsLogic.getAllCategories();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/number-of-products/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let numberOfProducts = await productsLogic.getCountOfProducts();
      response.json(numberOfProducts);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/products-by-category/:categoryId',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categoryId = request.params.categoryId;
      const productsByCategory = await productsLogic.getProductsByCategory(
        categoryId
      );
      response.json(productsByCategory);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/products-search/:pattern',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const pattern = request.params.pattern;
      const resultRegexSearch = await productsLogic.getProductByPattern(
        pattern
      );
      response.json(resultRegexSearch);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const products = await productsLogic.getAllProducts();
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  '',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const product = request.body;

      const addedProduct = await productsLogic.addProduct(product);
      response.status(201).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.put(
  '/:_id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const product = request.body;
      const _id = request.params._id;
      const updatedProduct = await productsLogic.updateProduct(_id, product);
      response.status(201).json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  '/:_id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const _id = request.params._id;
      await productsLogic.deleteProduct(_id);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/images/:imageName',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageName = req.params.imageName;
      const absolutePath = path.join(
        __dirname,
        '..',
        'assets',
        'images',
        imageName
      );
      res.sendFile(absolutePath);
    } catch (error: any) {
      next(error);
    }
  }
);
export default router;
