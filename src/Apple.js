import { randomPos, inArray } from './helpers';

class Apple {
    constructor({ ctx, block, x = 0, y = 0 }) {
        this.ctx = ctx;
        this.block = block || 32;
        this.position = { x, y };
        this.image = new Image();
        this.image.src = './apple.png';
    }
    onLoad(callback) {
        this.image.onload = callback;
    }
    add(excludeArr) {
        const getRandomPos = n => randomPos(1, n, this.block);
        const rows = this.ctx.canvas.width / this.block;
        const cols = this.ctx.canvas.height / this.block;
        let hasNewPos = false;

        while (!hasNewPos) {
            const newPos = {
                x: getRandomPos(rows),
                y: getRandomPos(cols)
            };
            if (!inArray(excludeArr, newPos)) {
                this.position = newPos;
                hasNewPos = true;
            }
        }
    }
    isAt(pos) {
        return JSON.stringify(this.position) === JSON.stringify(pos);
    }
    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.block, this.block);
    }
}

export default Apple;
 
