import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactModule } from './contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://emily:test@cluster0.7oibi.mongodb.net/api-menuiserie',
      {
        autoCreate: true,
      },
    ),
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
