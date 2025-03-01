import { Request, Response } from 'express';
import { CategoryModel } from './categoryModel';
import { categorySchema } from '../utils/validate';

class CategoryController {
  private categoryModel: CategoryModel;

  constructor() {
    this.categoryModel = CategoryModel.getInstance();
  }

  public createCategory = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { name } = req.body;

    const { error } = categorySchema.validate({ name });
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      res.status(400).json({ message: errorMessage });
      return;
    }

    try {
      const category = await this.categoryModel.createCategory(name);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  public getAllCategories = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const categories = await this.categoryModel.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่', // เปลี่ยนข้อความนี้
        error: (error as Error).message,
      });
    }
  };

  public getAllCategoryProducts = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const category = await this.categoryModel.getAllCategoryProducts(id);
      if (!category) {
        res.status(404).json({ message: 'ไม่พบหมวดหมู่' }); // เปลี่ยนข้อความนี้
        return;
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  public deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.categoryModel.deleteCategory(id);
      res.status(200).json({ message: 'ลบหมวดหมู่สำเร็จ' }); // เปลี่ยนข้อความนี้
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  public isNameExist = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.params;
      const exists = await this.categoryModel.isNameExist(name);
      res.status(200).json({ exists });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  public updateCategory = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const { name } = req.body;

    const { error } = categorySchema.validate({ name });
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      res.status(400).json({ message: errorMessage });
      return;
    }

    try {
      const updatedCategory = await this.categoryModel.updateCategory(id, name);
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
}

export default new CategoryController();
