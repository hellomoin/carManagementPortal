import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = (await this.users.findOne({ email: userData.email })) as User;
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const user: User = await this.users.create({ ...userData, password: hashedPassword });

    return JSON.parse(JSON.stringify(user));
  }

  public async login(userData: CreateUserDto): Promise<{ tokenData: TokenData; cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const user: User = (await this.users.findOne({ email: userData.email })) as User;
    if (!user) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { tokenData, cookie, findUser: JSON.parse(JSON.stringify(user)) };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const user: User = (await this.users.findOne({ email: userData.email, password: userData.password })) as User;
    if (!user) throw new HttpException(409, `You're email ${userData.email} not found`);

    return JSON.parse(JSON.stringify(user));
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user._id };
    const secretKey: string = SECRET_KEY || '';
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    //return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    return `X-API-KEY=${tokenData.token};`;
  }
}

export default AuthService;
