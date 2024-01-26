import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    // const query = this.boardRepository.createQueryBuilder('board');
    // query.where('board.userId = :userId', { userId: user.id });
    // const boards = await query.getMany();
    // return boards;
    return await this.boardRepository
      .createQueryBuilder('board')
      .where('board.userId = :userId', { userId: user.id })
      .getMany();
    // return await this.boardRepository.find({ order: { id: 'DESC' } });
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can not find board with id '${id}'`);
    }
    return found;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Can not find board with id '${id}'`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  // private board: Board[] = [];
  // getAllBoards(): Board[] {
  //   return this.board;
  // }
  // getBoardById(id: string): Board {
  //   const board = this.board.find((board) => board.id === id);
  //   if (!board) {
  //     throw new NotFoundException(`Can not find board with id '${id}'`);
  //   }
  //   return board;
  // }
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.board.push(board);
  //   return board;
  // }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.board = this.board.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   if (!board) {
  //     throw new NotFoundException('Can not find board');
  //   }
  //   board.status = status;
  //   return board;
  // }
}
