import { CartItemModel, ICartItemModel } from '../03-models/cartItem-model';

async function getAllItemsFromCart(cart_id: string): Promise<ICartItemModel[]> {
  return CartItemModel.find({ cart_id: cart_id }).populate('product').exec();
}

async function addCartItem(item): Promise<ICartItemModel> {
  return item.save();
}

async function updateCartItem(
  item_id: string,
  newQuantity
): Promise<ICartItemModel> {
  return await CartItemModel.findByIdAndUpdate(
    item_id,
    { quantity: newQuantity },
    { new: true }
  ).exec();
}

async function removeCartItem(_id: string): Promise<void> {
  await CartItemModel.findByIdAndDelete(_id).exec();
}
async function removeAllItemsFromCart(cart_id: string): Promise<void> {
  await CartItemModel.deleteMany({ cart_id: cart_id }).exec();
}

export default {
  getAllItemsFromCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  removeAllItemsFromCart,
};
