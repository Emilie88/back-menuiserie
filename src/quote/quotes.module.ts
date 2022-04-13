import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { QuoteSchema } from './quote.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quote', schema: QuoteSchema }]),
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
