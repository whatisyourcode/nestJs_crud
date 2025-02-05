import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards() : Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) : Board {
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        };

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string) : Board | undefined{
        const found = this.boards.find(board => board.id === id);
        if(!found){
            throw new NotFoundException(`Board with ID "${id}" not found`);
        }
        return found;
    }
}
