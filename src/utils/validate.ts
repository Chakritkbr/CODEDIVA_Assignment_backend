import Joi from 'joi';

const userSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.base': 'ชื่อจริงต้องเป็นข้อความ',
    'string.empty': 'กรุณากรอกชื่อจริง',
    'any.required': 'กรุณากรอกชื่อจริง',
  }),
  lastName: Joi.string().required().messages({
    'string.base': 'นามสกุลต้องเป็นข้อความ',
    'string.empty': 'กรุณากรอกนามสกุล',
    'any.required': 'กรุณากรอกนามสกุล',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'อีเมลต้องเป็นข้อความ',
    'string.email': 'รูปแบบอีเมลไม่ถูกต้อง',
    'string.empty': 'กรุณากรอกอีเมล',
    'any.required': 'กรุณากรอกอีเมล',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'รหัสผ่านต้องเป็นข้อความ',
    'string.min': 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
    'string.empty': 'กรุณากรอกรหัสผ่าน',
    'any.required': 'กรุณากรอกรหัสผ่าน',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'เบอร์โทรศัพท์ต้องเป็นข้อความ',
    'string.empty': 'กรุณากรอกเบอร์โทรศัพท์',
    'any.required': 'กรุณากรอกเบอร์โทรศัพท์',
  }),
  dateOfBirth: Joi.date().required().messages({
    'date.base': 'วันเกิดต้องเป็นวันที่',
    'date.empty': 'กรุณากรอกวันเกิด',
    'any.required': 'กรุณากรอกวันเกิด',
  }),
  gender: Joi.string().required().messages({
    'string.base': 'เพศต้องเป็นข้อความ',
    'string.empty': 'กรุณาเลือกเพศ',
    'any.required': 'กรุณาเลือกเพศ',
  }),
});

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'ชื่อหมวดหมู่ต้องเป็นข้อความ',
    'string.empty': 'กรุณากรอกชื่อหมวดหมู่',
    'any.required': 'กรุณากรอกชื่อหมวดหมู่',
  }),
});

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'ชื่อสินค้าต้องเป็นข้อความ',
    'string.empty': 'กรุณากรอกชื่อสินค้า',
    'any.required': 'กรุณากรอกชื่อสินค้า',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'ราคาต้องเป็นตัวเลข',
    'number.positive': 'ราคาต้องเป็นค่าบวก',
    'number.empty': 'กรุณากรอกราคา',
    'any.required': 'กรุณากรอกราคา',
  }),
  imageUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'URL รูปภาพไม่ถูกต้อง',
  }),
  categoryId: Joi.string().required().messages({
    'string.base': 'categoryId ต้องเป็นข้อความ',
    'string.empty': 'กรุณาเลือกหมวดหมู่สินค้า',
    'any.required': 'กรุณาเลือกหมวดหมู่สินค้า',
  }),
});

export { userSchema, categorySchema, productSchema };
