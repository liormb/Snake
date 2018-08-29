
export function arrowsMap(block) {
    return {
        ArrowUp: { x: 0, y: -block },
        ArrowDown: { x: 0, y: block },
        ArrowLeft: { x: -block, y: 0 },
        ArrowRight: { x: block, y: 0 }
    };
}

export function isValidMove(newDirection, prevDirection) {
    const arrows = arrowsMap(1);
    const firstMove = !prevDirection && newDirection !== 'ArrowLeft';

    const isValidPosition = () => {
        if (!prevDirection) {
            return false;
        }
        switch(newDirection) {
            case 'ArrowUp':
            case 'ArrowDown':
                return arrows[newDirection].x !== arrows[prevDirection].x;
            case 'ArrowLeft':
            case 'ArrowRight':
                return arrows[newDirection].y !== arrows[prevDirection].y;
        }
    };
    return !!arrows[newDirection] && (firstMove || isValidPosition());
}

export function randomPos(min, max, block) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand * block - block;
}

export function inArray(arr, pos) {
    return arr.some(val => val.x === pos.x && (val.y === pos.y));
}

export function logger(ctx, message) {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgb(99, 136, 64)';
    ctx.font = '45px Comic Sans MS';
    ctx.fillText(message, ctx.canvas.width / 2, ctx.canvas.height / 2);
}
