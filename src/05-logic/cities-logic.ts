import { CityModel, ICityModel } from '../03-models/city-model';

async function getAllCities(): Promise<ICityModel[]> {
  return CityModel.find().exec();
}

export default {
  getAllCities,
};
