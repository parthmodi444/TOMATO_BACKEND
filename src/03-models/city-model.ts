import { Document, model, Schema } from 'mongoose';

export interface ICityModel extends Document {
  city: string;
}

const CitySchema = new Schema<ICityModel>(
  {
    city: String,
  },
  {
    versionKey: false,
  }
);

export const CityModel = model<ICityModel>('CityModel', CitySchema, 'cities');
