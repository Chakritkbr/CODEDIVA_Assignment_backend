import jwt, { SignOptions } from 'jsonwebtoken';

// สร้าง JWT Token
export const generateToken = (userId: string, email: string): string => {
  const payload = {
    userId,
    email,
  };

  const secret = process.env.JWT_SECRET || 'your-secret-key'; // ค่าความลับสำหรับการเข้ารหัส
  const options: SignOptions = {
    expiresIn: '1h', // กำหนดเวลาหมดอายุของ Token
  };

  return jwt.sign(payload, secret, options);
};

// ตรวจสอบ JWT Token
export const verifyToken = (token: string): object | string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.verify(token, secret);
};
