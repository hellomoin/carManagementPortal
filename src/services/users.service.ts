import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@/models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return JSON.parse(JSON.stringify(users));
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const user: User = (await this.users.findOne({ _id: userId })) as User;
    if (!user) throw new HttpException(409, "You're not user");

    return JSON.parse(JSON.stringify(user));
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = (await this.users.findOne({ email: userData.email })) as User;
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const user: User = await this.users.create({ ...userData, password: hashedPassword });

    return JSON.parse(JSON.stringify(user));
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: User = (await this.users.findOne({ email: userData.email })) as User;
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const user: User = (await this.users.findByIdAndUpdate(userId, { userData })) as User;
    if (!user) throw new HttpException(409, "You're not user");

    return JSON.parse(JSON.stringify(user));
  }

  public async deleteUser(userId: string): Promise<User> {
    const user: User = (await this.users.findByIdAndDelete(userId)) as User;
    if (!user) throw new HttpException(409, "You're not user");

    return JSON.parse(JSON.stringify(user));
  }
}

export default UserService;
