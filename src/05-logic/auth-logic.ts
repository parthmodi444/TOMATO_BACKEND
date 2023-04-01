import cyber from '../01-utils/cyber';
import { ICredentialsModel } from '../03-models/credentials-model';
import { IUserModel, UserModel } from '../03-models/user-model';
import ErrorModel from '../03-models/error-model';

async function isUserIdFree(userId: number): Promise<boolean> {
  const result = await UserModel.find({ userId: userId }).exec();
  if (result.length !== 0) {
    return false;
    // userId is taken
  }
  return true;
}

//----/----//----/----//

async function register(user: IUserModel): Promise<string> {
  const errors = user.validateSync();
  if (errors) {
    throw new ErrorModel(400, errors.message);
  }

  // Is userId taken:
  const isTaken = await isUserIdFree(user.userId);
  if (!isTaken) {
    throw new ErrorModel(
      400,
      `Sorry. User Id ${user.userId} is not available.`
    );
  }

  user.password = cyber.hash(user.password);
  user.save();

  delete user.password;

  const token = cyber.getNewToken(user);
  return token;
}

//----/----//----/----//

async function login(credentials: ICredentialsModel): Promise<string> {
  const errors = credentials.validateSync();
  if (errors) {
    throw new ErrorModel(400, errors.message);
  }

  // Hash password:
  credentials.password = cyber.hash(credentials.password);

  const users = await UserModel.find({
    email: credentials.email,
    password: credentials.password,
  }).exec();

  if (users.length === 0) {
    throw new ErrorModel(401, 'Incorrect username or password');
  }

  const user = users[0];

  delete user.password;

  const token = cyber.getNewToken(user);
  return token;
}

export default {
  isUserIdFree,
  register,
  login,
};
