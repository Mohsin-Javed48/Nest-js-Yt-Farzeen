import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: string) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async create(data: CreateBookInput) {
    return this.prisma.book.create({ data });
  }

  async update(id: string, data: UpdateBookInput) {
    return this.prisma.book.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        author: data.author,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.book.delete({
      where: {
        id: id,
      },
    });
  }
}
