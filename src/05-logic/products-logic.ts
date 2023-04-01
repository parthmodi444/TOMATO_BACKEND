import { CategoryModel, ICategoryModel } from '../03-models/category-model';
import { IProductModel, ProductModel } from '../03-models/product-model';
import ErrorModel from '../03-models/error-model';

// handle images.
import { v4 as uuid } from 'uuid';
import path from 'path';
import fs from 'fs';

async function getAllCategories(): Promise<ICategoryModel[]> {
  return CategoryModel.find().exec();
}

async function getAllProducts(): Promise<IProductModel[]> {
  return ProductModel.find().select('-image').populate('category').exec();
}

async function getCountOfProducts(): Promise<number> {
  return ProductModel.find().count().exec();
}

async function getProductsByCategory(
  categoryId: string
): Promise<IProductModel[]> {
  return ProductModel.find({ category_id: categoryId })
    .select('-image')
    .populate('category')
    .exec();
}

async function getProductByPattern(pattern: string): Promise<IProductModel[]> {
  let resultRegexSearch = ProductModel.find({
    name: { $regex: pattern, $options: 'i' },
  })
    .populate('category')
    .exec();

  return resultRegexSearch;
}

async function addProduct(product: IProductModel): Promise<IProductModel> {
  // only if image was sent.
  if (product.image) {
    const extension = product.image.name.substring(
      product.image.name.lastIndexOf('.')
    );
    product.imageName = uuid() + extension;
    const absolutePath = path.join(
      __dirname,
      '..',
      'assets',
      'images',
      product.imageName
    );

    await product.image.mv(absolutePath);

    delete product.image;
  }

  const newProduct = new ProductModel(product);

  return newProduct.save();
}

async function updateProduct(
  product_id: string,
  product: IProductModel
): Promise<IProductModel> {
  // only if image was sent.
  if (product.image) {
    // delete old image.
    const excistingProduct = await ProductModel.findById(product_id).exec();

    if (excistingProduct.imageName) {
      removeImageFromDisk(excistingProduct.imageName);
    }
    // save new image.
    const extension = product.image.name.substring(
      product.image.name.lastIndexOf('.')
    );
    product.imageName = uuid() + extension;
    const absolutePath = path.join(
      __dirname,
      '..',
      'assets',
      'images',
      product.imageName
    );

    await product.image.mv(absolutePath);

    delete product.image;
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    product_id,
    product,
    { returnOriginal: false }
  ).exec();
  if (!updatedProduct)
    throw new ErrorModel(404, `_id ${product._id} not found`);

  return updatedProduct;
}

async function deleteProduct(_id: string): Promise<void> {
  // find & remove image from disc.
  const product = await ProductModel.findById(_id).exec();
  if (product.imageName) {
    removeImageFromDisk(product.imageName);
  }

  await ProductModel.findByIdAndDelete(_id).exec();
}

//----/----//----/----//

// remove image from disc.
async function removeImageFromDisk(imageName: string) {
  const absolutePath = path.join(
    __dirname,
    '..',
    'assets',
    'images',
    imageName
  );
  await fs.unlink(absolutePath, function (err) {
    if (err) throw err;
  });
  return;
}

export default {
  getAllCategories,
  getAllProducts,
  getCountOfProducts,
  getProductsByCategory,
  getProductByPattern,
  addProduct,
  deleteProduct,
  updateProduct,
};
