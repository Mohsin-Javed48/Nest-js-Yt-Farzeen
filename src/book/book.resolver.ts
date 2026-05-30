import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './model/book.model';
import { BookService } from './book.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  getBooks() {
    return this.bookService.findAll();
  }

  @Query(() => Book)
  getBook(@Args('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  createBook(@Args('input') input: CreateBookInput) {
    return this.bookService.create(input);
  }

  @Mutation(() => Book)
  updateBook(@Args('id') id: string, @Args('input') input: UpdateBookInput) {
    return this.bookService.update(id, input);
  }

  @Mutation(() => Book)
  async deleteBook(@Args('id') id: string) {
    const deletedBook = await this.bookService.findOne(id);
    if (!deletedBook) {
      throw new Error(`Book with id ${id} not found`);
    }
    return this.bookService.remove(id);
  }
}
