/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { Book } from '../model/book.model';
import { UpdateBookInput } from '../dto/update-book.input';
import { CreateBookInput } from '../dto/create-book.input';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], { name: 'getAllBooks' })
  async findAll() {
    return this.bookService.findAll();
  }

  @Query(() => Book, { name: 'getBookById' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book, { name: 'createBook' })
  async create(@Args('input') input: CreateBookInput) {
    return this.bookService.create(input);
  }

  @Mutation(() => Book, { name: 'updateBook' })
  async update(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateBookInput,
  ) {
    return this.bookService.update(id, input);
  }

  @Mutation(() => Book, { name: 'deleteBook' })
  async remove(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}
