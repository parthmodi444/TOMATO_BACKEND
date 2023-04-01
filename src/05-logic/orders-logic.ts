import { CityModel, ICityModel } from '../03-models/city-model';
import { IOrderModel, OrderModel } from '../03-models/order-model';
import cartsLogic from './carts-logic';

async function getCities(): Promise<ICityModel[]> {
  return CityModel.find().exec();
}

async function getNumberOfOrders(): Promise<number> {
  return OrderModel.find().count().exec();
}

async function getLastOrder(user_id): Promise<IOrderModel[]> {
  return OrderModel.find({ user_id: user_id })
    .sort({ _id: -1 })
    .limit(1)
    .exec();
}

async function addOrder(order: IOrderModel): Promise<IOrderModel> {
  await cartsLogic.deleteCart(order.cart_id.toString());

  return order.save();
}

async function checkDate(date: Date): Promise<boolean> {
  const numOfShippingOnDate = await countOrdersDates(date);
  if (numOfShippingOnDate >= 3) {
    return true;
  }
  return false;
}

//----/----//----/----//

async function countOrdersDates(shippingDate: Date): Promise<number> {
  const orderDate = await OrderModel.find({ shippingDate }).count().exec();
  return orderDate;
}

export default {
  getCities,
  getNumberOfOrders,
  addOrder,
  checkDate,
  getLastOrder,
};
