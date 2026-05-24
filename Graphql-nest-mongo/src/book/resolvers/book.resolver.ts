import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class BookResolver {
  @Query(() => String)
  healthCheck(): string {
    return 'ok';
  }
}
