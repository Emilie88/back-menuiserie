import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { QuotesService } from './quotes.service';

@Controller('quote')
export class QuotesController {
  constructor(private readonly quoteService: QuotesService) {}

  @Post()
  async addQuote(
    @Body('name') quoteName: string,
    @Body('phone') quotePhone: string,
    @Body('email') quoteEmail: string,
    @Body('address') quoteAddress: string,
    @Body('city') quoteCity: string,
    @Body('zipCode') quoteZipCode: string,
    @Body('subject') quoteSubject: string,
    @Body('message') quoteMessage: string,
  ) {
    const generatedId = await this.quoteService.insertQuote(
      quoteName,
      quotePhone,
      quoteEmail,
      quoteAddress,
      quoteCity,
      quoteZipCode,
      quoteSubject,
      quoteMessage,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllquotes() {
    const quotes = await this.quoteService.getQuotes();
    return quotes;
  }

  @Get(':id')
  getquote(@Param('id') quoteId: string) {
    return this.quoteService.getSingleQuote(quoteId);
  }

  @Patch(':id')
  async updateQuote(
    @Param('id') quoteId: string,
    @Body('name') quoteName: string,
    @Body('phone') quotePhone: string,
    @Body('email') quoteEmail: string,
    @Body('address') quoteAddress: string,
    @Body('city') quoteCity: string,
    @Body('zipCode') quoteZipCode: string,
    @Body('subject') quoteSubject: string,
    @Body('message') quoteMessage: string,
  ) {
    await this.quoteService.updateQuote(
      quoteId,
      quoteName,
      quotePhone,
      quoteEmail,
      quoteAddress,
      quoteCity,
      quoteZipCode,
      quoteSubject,
      quoteMessage,
    );
    return null;
  }

  //   @Delete(':id')
  //   async removequote(@Param('id') quoteId: string) {
  //     await this.quoteService.deletequote(quoteId);
  //     return null;
  //   }
}
