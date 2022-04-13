import * as mongoose from 'mongoose';

export const QuoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

export interface Quote extends mongoose.Document {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  subject: string;
  message: string;
}
