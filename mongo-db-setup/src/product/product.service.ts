import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(): Promise<Product> {
    const product = await new this.productModel({
      title: 'Sample Product',
      tags: [{ name: 'Tag1' }, { name: 'Tag2' }],
    }).save();
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }
}
