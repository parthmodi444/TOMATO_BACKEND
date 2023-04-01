import { Document, model, Schema } from 'mongoose';
import { UserModel } from './user-model';

export interface ICartModel extends Document {
  user_id: Schema.Types.ObjectId;
}

const CartSchema = new Schema<ICartModel>(
  {
    user_id: Schema.Types.ObjectId,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Virtual Fields:
CartSchema.virtual('user', {
  ref: UserModel, // Which model are you describing?
  localField: 'user_id', // Which field in our model is it
  foreignField: '_id', // Which field in CategoryModel is it
  justOne: true, // cart is a single object and not array
});

export const CartModel = model<ICartModel>('CartModel', CartSchema, 'carts');
