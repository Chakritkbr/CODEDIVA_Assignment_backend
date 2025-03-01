import prisma from '../db';
import { Category } from '@prisma/client';

export class CategoryModel {
  private static instance: CategoryModel;

  private constructor() {}

  public static getInstance(): CategoryModel {
    if (!CategoryModel.instance) {
      CategoryModel.instance = new CategoryModel();
    }
    return CategoryModel.instance;
  }

  public async createCategory(name: string): Promise<Category | null> {
    try {
      const existingCategory = await prisma.category.findUnique({
        where: { name },
      });
      if (existingCategory) throw new Error('ชื่อหมวดหมู่มีอยู่แล้ว');
      return await prisma.category.create({ data: { name } });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างหมวดหมู่:', error);
      throw new Error('เกิดข้อผิดพลาดในการสร้างหมวดหมู่');
    }
  }

  public async getAllCategories(): Promise<Category[]> {
    try {
      return await prisma.category.findMany({ include: { products: true } });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่ทั้งหมด:', error);
      throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่ทั้งหมด');
    }
  }

  public async getAllCategoryProducts(
    categoryId: string
  ): Promise<Category | null> {
    try {
      return await prisma.category.findUnique({
        where: { id: categoryId },
        include: { products: true },
      });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่ด้วย ID:', error);
      throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่ด้วย ID');
    }
  }

  public async deleteCategory(id: string): Promise<Category> {
    try {
      await prisma.product.deleteMany({ where: { categoryId: id } });

      const deletedCategory = await prisma.category.delete({ where: { id } });
      return deletedCategory;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบหมวดหมู่:', error);
      throw new Error('เกิดข้อผิดพลาดในการลบหมวดหมู่');
    }
  }

  public async isNameExist(name: string): Promise<boolean> {
    try {
      const category = await prisma.category.findUnique({ where: { name } });
      return !!category;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการตรวจสอบชื่อหมวดหมู่:', error);
      throw new Error('เกิดข้อผิดพลาดในการตรวจสอบชื่อหมวดหมู่');
    }
  }

  public async updateCategory(
    id: string,
    name: string
  ): Promise<Category | null> {
    try {
      const existingCategory = await prisma.category.findUnique({
        where: { id },
      });
      if (!existingCategory) throw new Error('ไม่พบหมวดหมู่');
      return await prisma.category.update({ where: { id }, data: { name } });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตหมวดหมู่:', error);
      if (error instanceof Error && error.message === 'ไม่พบหมวดหมู่') {
        throw error;
      }
      throw new Error('เกิดข้อผิดพลาดในการอัปเดตหมวดหมู่');
    }
  }
}

export default CategoryModel;
