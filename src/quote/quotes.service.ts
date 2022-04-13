import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Quote } from './quote.model';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel('Quote') private readonly QuoteModel: Model<Quote>,
  ) {}

  async insertQuote(
    name: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    zipCode: string,
    subject: string,
    message: string,
  ) {
    const newQuote = new this.QuoteModel({
      name,
      phone,
      email,
      address,
      city,
      zipCode,
      subject,
      message,
    });
    const result = await newQuote.save();
    return result.id as string;
  }

  async getQuotes() {
    const quotes = await this.QuoteModel.find().exec();
    return quotes.map((quote) => ({
      id: quote.id,
      name: quote.name,
      phone: quote.phone,
      email: quote.email,
      address: quote.address,
      city: quote.city,
      zipCode: quote.zipCode,
      subject: quote.subject,
      message: quote.message,
    }));
  }

  async getSingleQuote(quoteId: string) {
    const quote = await this.findQuote(quoteId);
    return {
      id: quote.id,
      name: quote.name,
      phone: quote.phone,
      email: quote.email,
      address: quote.address,
      city: quote.city,
      zipCode: quote.zipCode,
      subject: quote.subject,
      message: quote.message,
    };
  }

  async updateQuote(
    quoteId: string,
    name: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    zipCode: string,
    subject: string,
    message: string,
  ) {
    const updatedQuote = await this.findQuote(quoteId);
    if (name) {
      updatedQuote.name = name;
    }
    if (phone) {
      updatedQuote.phone = phone;
    }
    if (email) {
      updatedQuote.email = email;
    }
    if (address) {
      updatedQuote.address = address;
    }
    if (city) {
      updatedQuote.city = city;
    }
    if (zipCode) {
      updatedQuote.zipCode = zipCode;
    }
    if (subject) {
      updatedQuote.subject = subject;
    }
    if (message) {
      updatedQuote.message = message;
    }
    updatedQuote.save();
  }

  // async deleteQuote(QuoteId: string) {
  //   const result = await this.QuoteModel.deleteOne({ _id: QuoteId }).exec();
  //   if (result.n === 0) {
  //     throw new NotFoundException('Could not find Quote.');
  //   }
  // }

  private async findQuote(id: string): Promise<Quote> {
    let quote;
    try {
      quote = await this.QuoteModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Quote.');
    }
    if (!quote) {
      throw new NotFoundException('Could not find Quote.');
    }
    return quote;
  }
}
