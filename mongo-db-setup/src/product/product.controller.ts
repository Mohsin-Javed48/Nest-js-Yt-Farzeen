/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct() {
    return this.productService.createProduct();
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }
}
