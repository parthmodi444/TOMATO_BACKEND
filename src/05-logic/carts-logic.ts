import { CartModel, ICartModel } from '../03-models/cart-model';
import { CartItemModel } from '../03-models/cartItem-model';
import ErrorModel from '../03-models/error-model';

async function getCart(user_id: string): Promise<ICartModel> {
  //check if cart exsits.
  let myCart = await isCartExist(user_id);
  if (myCart.length > 0) {
    return myCart[0];
  }
  return undefined;
}

async function createCart(user_id: string): Promise<ICartModel> {
  let newCart = await createNewCart(user_id);
  return newCart;
}

async function forceNewCart(
  cart_id: string,
  user_id: string
): Promise<ICartModel> {
  // have cart but want to delete and create new cart.

  // delete existing cart;
  await CartModel.findByIdAndDelete({ _id: cart_id }).exec();

  // delete cartItems related to cart;
  await CartItemModel.deleteMany({ cart_id: cart_id }).exec();

  // create new cart;
  let newCart = await createNewCart(user_id);
  console.log('newCart -03 -', newCart);
  return newCart;
}

async function deleteCart(cart_id: string): Promise<void> {
  // delete existing cart;
  await CartModel.findByIdAndDelete({ _id: cart_id }).exec();

  // delete cartItems related to cart;
  await CartItemModel.deleteMany({ cart_id: cart_id }).exec();
}

//----/----//----/----//

async function isCartExist(user_id: string): Promise<ICartModel[]> {
  const cart = await CartModel.find({ user_id: user_id })
    .populate('user')
    .exec();
  console.log('cart exists. - ', cart);
  return cart;
}

async function createNewCart(user_id: string): Promise<ICartModel> {
  const cart = new CartModel({ user_id: user_id });
  return cart.save();
}

export default {
  getCart,
  createCart,
  forceNewCart,
  deleteCart,
};
