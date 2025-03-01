import prisma from '../db';
import { User } from '@prisma/client';

export class UserModel {
  private static instance: UserModel;

  private constructor() {}

  public static getInstance(): UserModel {
    if (!UserModel.instance) {
      UserModel.instance = new UserModel();
    }
    return UserModel.instance;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      console.log(user);
      return user;
    } catch (error) {
      throw new Error('เกิดข้อผิดพลาดขณะดึงข้อมูลผู้ใช้ด้วยอีเมล');
    }
  }

  public async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      console.log(user);
      return user;
    } catch (error) {
      throw new Error('เกิดข้อผิดพลาดขณะดึงข้อมูลผู้ใช้ด้วย ID');
    }
  }

  public async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender: string;
  }): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data,
      });
      console.log(newUser);
      return newUser;
    } catch (error) {
      throw new Error('เกิดข้อผิดพลาดขณะสร้างผู้ใช้');
    }
  }

  public async checkUserExists(email: string): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      return user !== null;
    } catch (error) {
      throw new Error('เกิดข้อผิดพลาดขณะตรวจสอบว่าผู้ใช้มีอยู่หรือไม่');
    }
  }
}

export default UserModel;
