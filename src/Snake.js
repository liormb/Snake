import { inArray } from './helpers';

class Snake {
    constructor({ ctx, block, length, speed }) {
        this.ctx = ctx;
        this.block = block;
        this.length = length || 3;
        this.ownSpeed = speed || 120;
        this.positions = Array.from({ length: this.length }, (v, i) => ++i)
            .map(i => ({ x: i * block, y: ctx.canvas.width / 2 }))
            .reverse();
    }
    get head() {
        return this.positions[0];
    }
    get axis() {
        return this.positions;
    }
    get speed() {
        return this.ownSpeed;
    }
    contains(pos) {
        return inArray(this.positions, pos);
    }
    growBy(pos, times = 1) {
        this.length += times;
        Array.from(Array(times).keys())
            .map(() => this.positions.push(pos));
    }
    moveTo(pos) {
        this.positions.unshift(pos);
        this.positions.pop();
    }
    draw() {
        this.ctx.fillStyle = 'rgb(119, 156, 144)';
        this.positions.forEach(pos =>
            this.ctx.fillRect(pos.x, pos.y, this.block, this.block)
        );
    }
}

export default Snake;
 
