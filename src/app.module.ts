import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BoardModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
