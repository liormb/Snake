import Apple from './Apple';

const scoreBoardEl = document.querySelector('.score-board');
const ctx = scoreBoardEl.getContext('2d');

class ScoreBoard {
    constructor() {
        this.score = 0;
        this.apple = new Apple({ ctx, block: 40, x: 10, y: 10 });
        this.apple.onLoad(this.draw.bind(this));
    }
    draw() {
        // draw canvas
        ctx.fillStyle = 'rgb(109, 146, 74)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // draw apple
        this.apple.draw();

        // draw score
        ctx.font = '25px Comic Sans MS';
        ctx.fillStyle = 'white';
        ctx.fillText(this.score, 60, 40);
    }
    addPoint() {
        this.score++;
        this.draw();
    }
    reset() {
        this.score = 0;
        this.draw();
    }
}

export default ScoreBoard;
