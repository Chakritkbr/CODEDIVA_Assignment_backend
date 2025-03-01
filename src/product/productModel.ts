import prisma from '../db';
import { Product } from '@prisma/client';

export class ProductModel {
  private static instance: ProductModel;

  private constructor() {}

  public static getInstance(): ProductModel {
    if (!ProductModel.instance) {
      ProductModel.instance = new ProductModel();
    }
    return ProductModel.instance;
  }

  public async createProduct(
    name: string,
    price: number,
    categoryId: string,
    imageUrl: string
  ): Promise<Product> {
    try {
      return await prisma.product.create({
        data: { name, price, categoryId, imageUrl },
      });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างสินค้า:', error);
      throw new Error('เกิดข้อผิดพลาดในการสร้างสินค้า');
    }
  }

  public async getAllProducts(): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        include: { category: true },
      });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าทั้งหมด:', error);
      throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าทั้งหมด');
    }
  }

  public async getProductById(id: string): Promise<Product | null> {
    try {
      return await prisma.product.findUnique({
        where: { id },
        include: { category: true },
      });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าด้วย ID:', error);
      throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าด้วย ID');
    }
  }

  public async deleteProduct(id: string): Promise<Product> {
    try {
      return await prisma.product.delete({ where: { id } });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบสินค้า:', error);
      throw new Error('เกิดข้อผิดพลาดในการลบสินค้า');
    }
  }

  public async updateProduct(
    id: string,
    name: string,
    price: number,
    categoryId: string,
    imageUrl: string
  ): Promise<Product | null> {
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });
      if (!existingProduct) throw new Error('ไม่พบสินค้า');
      return await prisma.product.update({
        where: { id },
        data: { name, price, categoryId, imageUrl },
      });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตสินค้า:', error);
      if (error instanceof Error && error.message === 'ไม่พบสินค้า') {
        throw error;
      }
      throw new Error('เกิดข้อผิดพลาดในการอัปเดตสินค้า');
    }
  }
}

export default ProductModel;
