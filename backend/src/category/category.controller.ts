import { Controller, Get, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  async getAllCategories(@Res() res: Response) {
    const categories = await this.categoryService.getAll();
    res.status(200).json(categories);
  }
}
