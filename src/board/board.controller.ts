import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  private logger = new Logger('BoardController');
  constructor(private boardService: BoardService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} trying to create a new board. -> Payload: ${JSON.stringify(createBoardDto)}`,
    );
    return await this.boardService.createBoard(createBoardDto, user);
  }

  @Get()
  async getAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return await this.boardService.getAllBoards(user);
  }

  @Get('/:id')
  async getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return await this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.boardService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return await this.boardService.updateBoardStatus(id, status);
  }

  // @Get()
  // getAllBoards(): Board[] {
  //   return this.boardService.getAllBoards();
  // }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardService.getBoardById(id);
  // }

  // @Post()
  // @HttpCode(201)
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardService.createBoard(createBoardDto);
  // }

  // @Delete('/:id')
  // @HttpCode(204)
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardService.updateBoardStatus(id, status);
  // }
}
