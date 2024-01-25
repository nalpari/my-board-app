import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  // async createBoard(createBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board = new Board();
  //   board.title = title;
  //   board.description = description;
  //   board.status = BoardStatus.PUBLIC;
  //   await board.save();
  //   return board;
  // }
}
