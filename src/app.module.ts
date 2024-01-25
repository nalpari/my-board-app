import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
