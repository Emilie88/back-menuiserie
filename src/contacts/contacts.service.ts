import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Contact } from './contact.model';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<Contact>,
  ) {}

  async insertContact(
    name: string,
    email: string,
    subject: string,
    message: string,
  ) {
    const newContact = new this.contactModel({
      name,
      email,
      subject,
      message,
    });
    const result = await newContact.save();
    return result.id as string;
  }

  async getContacts() {
    const contacts = await this.contactModel.find().exec();
    return contacts.map((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message
    }));
  }

  async getSingleContact(contactId: string) {
    const contact = await this.findContact(contactId);
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message
    };
  }

  async updateContact(
    contactId: string,
    name: string,
    email: string,
    subject: string,
    message: string
  ) {
    const updatedContact = await this.findContact(contactId);
    if (name) {
      updatedContact.name = name;
    }
    if (email) {
      updatedContact.email = email;
    }
    if (subject) {
      updatedContact.subject = subject;
    }
    if (message) {
      updatedContact.message = message;
    }
    updatedContact.save();
  }

  // async deleteContact(contactId: string) {
  //   const result = await this.contactModel.deleteOne({ _id: contactId }).exec();
  //   if (result.n === 0) {
  //     throw new NotFoundException('Could not find contact.');
  //   }
  // }

  private async findContact(id: string): Promise<Contact> {
    let contact;
    try {
      contact = await this.contactModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find contact.');
    }
    if (!contact) {
      throw new NotFoundException('Could not find contact.');
    }
    return contact;
  }
}
