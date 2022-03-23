import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ContactService } from './contacts.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async addContact(
    @Body('name') contactName: string,
    @Body('email') contactEmail: string,
    @Body('subject') contactSubject: string,
    @Body('message') contactMessage: string,
  ) {
    const generatedId = await this.contactService.insertContact(
      contactName,
      contactEmail,
      contactSubject,
      contactMessage,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllContacts() {
    const contacts = await this.contactService.getContacts();
    return contacts;
  }

  @Get(':id')
  getContact(@Param('id') contactId: string) {
    return this.contactService.getSingleContact(contactId);
  }

  @Patch(':id')
  async updateContact(
    @Param('id') contactId: string,
    @Body('name') contactName: string,
    @Body('email') contactEmail: string,
    @Body('subject') contactSubject: string,
    @Body('message') contactMessage: string,
  ) {
    await this.contactService.updateContact(
      contactId,
      contactName,
      contactEmail,
      contactSubject,
      contactMessage,
    );
    return null;
  }

  //   @Delete(':id')
  //   async removeContact(@Param('id') contactId: string) {
  //     await this.contactService.deleteContact(contactId);
  //     return null;
  //   }
}
