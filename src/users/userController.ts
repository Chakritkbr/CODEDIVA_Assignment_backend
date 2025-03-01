import { Request, Response } from 'express';
import UserModel from './userModel';
import { comparePassword, hashPassword } from '../utils/passwordUtils';
import { generateToken } from '../utils/jwtUtils';
import { userSchema } from '../utils/validate'; // นำเข้า userSchema

class UserController {
  private userModel: UserModel;

  constructor() {
    this.userModel = UserModel.getInstance();
    console.log(this.userModel);
  }

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
    } = req.body;

    const { error } = userSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      res.status(400).json({ message: errorMessage });
      return;
    }

    try {
      const userExists = await this.userModel.checkUserExists(email);
      if (userExists) {
        res.status(400).json({ message: 'อีเมลนี้มีบัญชีอยู่แล้ว' });
        return;
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await this.userModel.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        dateOfBirth,
        gender,
      });

      res.status(201).json({ message: 'สร้างผู้ใช้สำเร็จ', user: newUser });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(500)
        .json({ message: 'เกิดข้อผิดพลาดขณะสร้างผู้ใช้', error: errorMessage });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const loginSchema = userSchema.extract(['email', 'password']);
    const { error } = loginSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      res.status(400).json({ message: errorMessage });
      return;
    }

    try {
      const user = await this.userModel.getUserByEmail(email);
      if (!user) {
        res.status(400).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
        return;
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
        return;
      }

      const token = generateToken(user.id, user.email);

      res.status(200).json({
        message: 'เข้าสู่ระบบสำเร็จ',
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(500)
        .json({ message: 'เกิดข้อผิดพลาดขณะเข้าสู่ระบบ', error: errorMessage });
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
      const user = await this.userModel.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: 'ไม่พบผู้ใช้' });
        return;
      }

      res.status(200).json({ user });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({
        message: 'เกิดข้อผิดพลาดขณะดึงข้อมูลผู้ใช้',
        error: errorMessage,
      });
    }
  };
}

export default new UserController();
