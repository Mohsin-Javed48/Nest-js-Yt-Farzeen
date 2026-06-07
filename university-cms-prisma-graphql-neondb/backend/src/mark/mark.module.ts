import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';

@Module({
  providers: [MarkService]
})
export class MarkModule {}
