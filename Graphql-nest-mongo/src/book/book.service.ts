import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookDocument } from './model/book.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateBookInput } from './dto/update-book.input';
import { CreateBookInput } from './dto/create-book.input';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const createdBook = new this.bookModel(createBookInput);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookInput: UpdateBookInput): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookInput, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return updatedBook;
  }

  async remove(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return deletedBook;
  }
}
