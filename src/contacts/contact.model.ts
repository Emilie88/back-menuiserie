import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

export interface Contact extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}
