import { Document, model, Schema } from 'mongoose';
import { CartModel } from './cart-model';
import { ProductModel } from './product-model';

export interface ICartItemModel extends Document {
  product_id: Schema.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  cart_id: Schema.Types.ObjectId;
}

const CartItemSchema = new Schema<ICartItemModel>(
  {
    product_id: Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    cart_id: Schema.Types.ObjectId,
  },
  {
    versionKey: false,
  }
);

// Virtual Fields:
CartItemSchema.virtual('product', {
  ref: ProductModel,
  localField: 'product_id',
  foreignField: '_id',
  justOne: true,
});

// Virtual Fields:
CartItemSchema.virtual('cart', {
  ref: CartModel,
  localField: 'cart_id',
  foreignField: '_id',
  justOne: true,
});

export const CartItemModel = model<ICartItemModel>(
  'CartItemModel',
  CartItemSchema,
  'cart-items'
);
