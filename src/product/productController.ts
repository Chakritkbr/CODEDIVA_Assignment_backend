import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ProductModel } from './productModel';
import { productSchema } from '../utils/validate';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads/products';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

class ProductController {
  private productModel: ProductModel;

  constructor() {
    this.productModel = ProductModel.getInstance();
  }

  public createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, price, categoryId } = req.body;
    const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : '';

    const { error } = productSchema.validate({
      name,
      price,
      imageUrl,
      categoryId,
    });
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      res.status(400).json({ message: errorMessage });
      return;
    }

    try {
      const parsedPrice = parseFloat(price);

      if (isNaN(parsedPrice)) {
        res.status(400).json({ message: 'ราคาต้องเป็นตัวเลขเท่านั้น' });
        return;
      }

      const product = await this.productModel.createProduct(
        name,
        parsedPrice,
        categoryId,
        imageUrl
      );

      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  public getAllProducts = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const products = await this.productModel.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า',
        error: (error as Error).message,
      });
    }
  };

  public getProductById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productModel.getProductById(id);
      if (!product) {
        res.status(404).json({ message: 'ไม่พบสินค้า' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  public deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.productModel.deleteProduct(id);
      res.status(200).json({ message: 'ลบสินค้าสำเร็จ' });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  public updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;
    const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : '';

    const { error } = productSchema.validate({
      name,
      price,
      imageUrl,
      categoryId,
    });
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      res.status(400).json({ message: errorMessage });
      return;
    }

    try {
      const updatedProduct = await this.productModel.updateProduct(
        id,
        name,
        price,
        categoryId,
        imageUrl
      );
      res.status(200).json({ message: 'แก้ไขสินค้าสำเร็จ', updatedProduct });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
}

export default new ProductController();
