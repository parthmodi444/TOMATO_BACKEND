import { Document, model, Schema } from 'mongoose';
import { CartModel } from './cart-model';
import { ICityModel } from './city-model';
import { UserModel } from './user-model';

export interface IOrderModel extends Document {
  user_id: Schema.Types.ObjectId;
  cart_id: Schema.Types.ObjectId;
  totalPrice: number;
  shippingCity: ICityModel;
  shippingStreet: ICityModel;
  shippingDate: Date;
  creditCardNumber: number;
}

const OrderSchema = new Schema<IOrderModel>(
  {
    user_id: Schema.Types.ObjectId,
    cart_id: Schema.Types.ObjectId,
    totalPrice: Number,
    shippingCity: String,
    shippingStreet: String,
    shippingDate: Date,
    creditCardNumber: Number,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Virtual Fields:
OrderSchema.virtual('user', {
  ref: UserModel,
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

OrderSchema.virtual('cart', {
  ref: CartModel,
  localField: 'cart_id',
  foreignField: '_id',
  justOne: true,
});

export const OrderModel = model<IOrderModel>(
  'OrderModel',
  OrderSchema,
  'orders'
);
