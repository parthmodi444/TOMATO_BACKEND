import { Document, model, Schema } from 'mongoose';

export interface ICredentialsModel extends Document {
  email: string;
  password: string;
}

const CredentialsSchema = new Schema<ICredentialsModel>(
  {
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
      maxlength: [20, 'Password Too long.'],
      trim: true,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

export const CredentialsModel = model<ICredentialsModel>(
  'CredentialsModel',
  CredentialsSchema,
  'users'
);
