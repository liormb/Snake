import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

new GameBoard({
    block: 32,
    scoreBoard: new ScoreBoard()
});
