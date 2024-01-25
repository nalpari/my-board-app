import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // type of our database
  host: 'localhost', // database host
  port: 5432, // database host
  username: 'postgres', // username
  password: 'qwer1234', // user password
  database: 'board-app', // name of our database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // entities (database table objects)
  synchronize: true, // automatically synchronize our models with our database
};
