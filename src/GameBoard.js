import { arrowsMap, isValidMove, logger } from './helpers';
import Apple from './Apple';
import Snake from './Snake';

const gameBoardEl = document.querySelector('.game-board');
const ctx = gameBoardEl.getContext('2d');

class GameBoard {
    constructor({ scoreBoard, block }) {
        this.scoreBoard = scoreBoard;
        this.block = block;
        this.arrows = arrowsMap(block);
        this.direction = null;
        this.isPause = false;
        this.isOver = false;
        this.snake = new Snake({ ctx, block });
        this.apple = new Apple({ ctx, block });

        window.addEventListener('keydown', this.eventHandler.bind(this));

        this.apple.onLoad(() => {
            this.apple.add(this.snake.axis);
            this.interval =
                setInterval(() => this.move(this.direction), this.snake.speed);
        });
    }
    eventHandler({ key }) {
        if (this.isOver) {
            return;
        } else if (isValidMove(key, this.direction)) {
            this.direction = key;
            this.move(this.direction);
        } else if (key === ' ') {
            this.pause();
        }
    }
    isGameOver({ x, y }) {
        const hasHitItself = this.snake.contains({ x, y });
        const hasHitWalls = (
            x < 0 || x + this.block > ctx.canvas.width ||
            y < 0 || y + this.block > ctx.canvas.height
        );
        return hasHitItself || hasHitWalls;
    }
    drawBoard() {
        // draw canvas
        ctx.fillStyle = 'rgb(180, 213, 102)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // draw check board
        ctx.fillStyle = 'rgb(172, 207, 95)';
        for (let i = 0; i < ctx.canvas.width / this.block; i++) {
            for (let j = 0; j < ctx.canvas.height / this.block; j++) {
                if ((i + j) % 2) {
                    ctx.fillRect(this.block * i, this.block * j, this.block, this.block);
                }
            }
        }
    }
    draw() {
        this.drawBoard();
        this.snake.draw();
        this.apple.draw();
    }
    move(direction) {
        if (this.isPause || this.isOver) {
            return;
        } else if (!this.direction) {
            this.draw();
            logger(ctx, 'Move to Start');
            return;
        }

        const { x, y } = this.arrows[direction];
        const newPos = {
            x: this.snake.head.x + x,
            y: this.snake.head.y + y
        };

        if (this.isGameOver(newPos)) {
            this.gameOver();
            return;
        }
        this.snake.moveTo(newPos);

        if (this.apple.isAt(newPos)) {
            this.snake.growBy(newPos, 2);
            this.apple.add(this.snake.axis);
            this.scoreBoard.addPoint();
        }
        this.draw();
    }
    pause() {
        if (!this.direction) {
            return;
        }
        this.isPause = !this.isPause;

        if (this.isPause) {
            logger(ctx, 'Pause');
        }
    }
    gameOver() {
        this.isOver = true;
        clearInterval(this.interval);
        logger(ctx, 'Game Over!');
    }
}

export default GameBoard;
