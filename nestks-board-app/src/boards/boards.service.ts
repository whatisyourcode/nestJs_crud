import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v4 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards() : Board[] {
        return this.boards;
    }

    createBoard(createBoardDto : CreateBoardDto) : Board {
        const {title, description} = createBoardDto;

        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        };

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string) : Board{
        const found = this.boards.find(board => board.id === id);
        if(!found){
            throw new NotFoundException(`Board with ID "${id}" not found`);
        }
        return found;
    }

    deleteBoard(id : string) : void {
        this.boards = this.boards.filter(board => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus) : Board {
        const board = this.getBoardById(id);
        if (!board) {
            throw new NotFoundException(`Board with ID "${id}" not found`);
        }
        board.status = status; 
        return board;
    }
}
