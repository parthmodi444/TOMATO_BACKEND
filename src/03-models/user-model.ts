import { Document, model, Schema } from 'mongoose';

export interface IUserModel extends Document {
  userId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<IUserModel>(
  {
    userId: {
      type: Number,
      required: [true, 'Missing User Id'],
      minlength: [7, 'Id Too Short.'],
      maxlength: [14, 'Id Too long.'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Missing Email'],
      minlength: [4, 'Email Too Short.'],
      maxlength: [100, 'Email Too long.'],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email must be valid.'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Missing Password'],
      minlength: [4, 'Password Too Short.'],
      maxlength: [150, 'Password Too long.'],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, 'Missing First Name'],
      minlength: [2, 'Name Too Short.'],
      maxlength: [50, 'Name Too long.'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Missing Last Name '],
      minlength: [2, 'Last name Too Short.'],
      maxlength: [50, 'Last name Too long.'],
      trim: true,
    },
    city: {
      type: String,
      minlength: [2, 'City Too Short.'],
      maxlength: [50, 'Street Too long.'],
      trim: true,
    },
    street: {
      type: String,
      minlength: [2, 'Street Too Short.'],
      maxlength: [50, 'Street Too long.'],
      trim: true,
    },
    isAdmin: Boolean,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

export const UserModel = model<IUserModel>('UserModel', UserSchema, 'users');
