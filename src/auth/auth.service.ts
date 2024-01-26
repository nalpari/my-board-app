import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(authCredentialDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredentialDto;
    const hashedPassword = await hash(password, 12);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
