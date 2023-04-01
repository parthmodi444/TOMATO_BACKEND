import { CategoryModel } from './category-model';
import { Document, model, Schema } from 'mongoose';
import { UploadedFile } from 'express-fileupload';

export interface IProductModel extends Document {
  name: string;
  price: number;
  category_id: Schema.Types.ObjectId;
  imageName: string;
  image: UploadedFile;
}

const ProductSchema = new Schema<IProductModel>(
  {
    name: {
      type: String,
      required: [true, 'Missing Product Name'],
      minlength: [2, 'Name Too Short.'],
      maxlength: [50, 'Name Too long.'],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'Missing Price'],
      min: [0.01, 'Price Too Low.'],
      max: [10000, 'Price Too High.'],
      trim: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      required: [true, 'Missing Category Id'],
    },
    imageName: {
      type: String,
      unique: true,
    },
    image: Object,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

// Virtual Fields:
ProductSchema.virtual('category', {
  ref: CategoryModel,
  localField: 'category_id',
  foreignField: '_id',
  justOne: true,
});

export const ProductModel = model<IProductModel>(
  'ProductModel',
  ProductSchema,
  'products'
);
