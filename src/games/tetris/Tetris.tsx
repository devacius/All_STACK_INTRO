import React, { useState, useEffect, useCallback } from 'react';

// Game constants
const STAGE_WIDTH = 12;
const STAGE_HEIGHT = 20;

interface TetrominoType {
  shape: number[][];
  color: string;
}

interface TetriminosMap {
  [key: string]: TetrominoType;
}

const TETROMINOS: TetriminosMap = {
  0: { shape: [[0]], color: 'transparent' },
  I: { shape: [[1, 1, 1, 1]], color: '#00f0f0' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000f0' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f0a000' },
  O: { shape: [[1, 1], [1, 1]], color: '#f0f000' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00f000' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#f00000' },
};

type CellType = [number | string, string];
type StageType = CellType[][];

const createStage = (): StageType =>
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

const randomTetromino = (): TetrominoType => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

interface PlayerType {
  pos: { x: number; y: number };
  tetromino: number[][];
  tetrominoType: string;
  collided: boolean;
}

const Tetris: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [stage, setStage] = useState<StageType>(createStage());
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState<PlayerType>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    tetrominoType: '0',
    collided: false,
  });

  const resetPlayer = useCallback(() => {
    const tetrominos = 'IJLOSTZ';
    const randType = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    const newTetromino = TETROMINOS[randType];
    setPlayer({
      pos: { x: Math.floor(STAGE_WIDTH / 2) - 2, y: 0 },
      tetromino: newTetromino.shape,
      tetrominoType: randType,
      collided: false,
    });
  }, []);

  const startGame = useCallback(() => {
    resetPlayer();
    setStage(createStage());
    setDropTime(1000);
    setScore(0);
    setGameOver(false);
  }, [resetPlayer]);

  useEffect(() => {
    startGame();
  }, []);

  const rotate = (matrix: number[][], dir: number): number[][] => {
    const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]));
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerCollision = (stage: StageType, player: PlayerType, { x: moveX, y: moveY }: { x: number; y: number }): boolean => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
      for (let x = 0; x < player.tetromino[y].length; x += 1) {
        if (player.tetromino[y][x] !== 0) {
          if (
            !stage[y + player.pos.y + moveY] ||
            !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
            stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const updateStage = (prevStage: StageType): StageType => {
    const newStage = prevStage.map(row =>
      row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] as CellType : cell))
    );

    const color = TETROMINOS[player.tetrominoType]?.color || 'white';
    
    player.tetromino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newStage[y + player.pos.y][x + player.pos.x] = [
            color,
            `${player.collided ? 'merged' : 'clear'}`,
          ];
        }
      });
    });

    let rowsCleared = 0;
    for (let y = newStage.length - 1; y >= 0; y -= 1) {
      if (newStage[y].every((cell: CellType) => cell[0] !== 0 && cell[1] === 'merged')) {
        rowsCleared += 1;
        newStage.splice(y, 1);
        newStage.unshift(Array(STAGE_WIDTH).fill([0, 'clear']));
        y += 1;
      }
    }

    if (rowsCleared > 0) {
      const lineScores = [0, 100, 300, 500, 800];
      setScore(prev => prev + (lineScores[rowsCleared] || 0));
    }

    return newStage;
  };

  const movePlayer = (dir: number): void => {
    if (!playerCollision(stage, player, { x: dir, y: 0 })) {
      setPlayer(prev => ({ ...prev, pos: { ...prev.pos, x: prev.pos.x + dir } }));
    }
  };

  const drop = (): void => {
    if (!playerCollision(stage, player, { x: 0, y: 1 })) {
      setPlayer(prev => ({ ...prev, pos: { ...prev.pos, y: prev.pos.y + 1 } }));
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      setPlayer(prev => ({ ...prev, collided: true }));
    }
  };

  const rotatePlayer = (): void => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)) as PlayerType;
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, 1);
    if (!playerCollision(stage, clonedPlayer, { x: 0, y: 0 })) {
      setPlayer(clonedPlayer);
    }
  };

  const move = ({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      if (keyCode === 37) movePlayer(-1);
      if (keyCode === 39) movePlayer(1);
      if (keyCode === 40) drop();
      if (keyCode === 38) rotatePlayer();
    }
  };

  useEffect(() => {
    if (!dropTime || gameOver) return;
    const interval = setInterval(() => {
      drop();
    }, dropTime);
    return () => clearInterval(interval);
  }, [dropTime, gameOver, player, stage]);

  useEffect(() => {
    setStage(prev => updateStage(prev));
    if (player.collided) {
      resetPlayer();
    }
  }, [player.collided, player.pos.x, player.pos.y]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => move({ keyCode: e.keyCode });
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, player, stage]);

  return (
    <div className="flex flex-col items-center bg-black p-8 min-h-screen">
      <div className="text-white text-3xl mb-6 font-bold">Score: {score}</div>
      {gameOver ? (
        <div className="text-center">
          <div className="text-white text-2xl mb-4">Game Over!</div>
          <div className="text-white text-xl mb-4">Final Score: {score}</div>
          <button 
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div 
          className="grid gap-px border-2 border-gray-700 bg-gray-900"
          style={{
            gridTemplateRows: `repeat(${STAGE_HEIGHT}, 20px)`,
            gridTemplateColumns: `repeat(${STAGE_WIDTH}, 20px)`,
          }}
        >
          {stage.map((row, rowIdx) =>
            row.map((cell, cellIdx) => (
              <div
                key={`${rowIdx}-${cellIdx}`}
                className="w-5 h-5 border border-gray-800"
                style={{
                  background: cell[0] === 0 ? 'rgba(0,0,0,0.8)' : String(cell[0])
                }}
              />
            ))
          )}
        </div>
      )}
      <div className="text-white text-sm mt-6 text-center">
        <p>Arrow Keys: ← → to move, ↓ to drop, ↑ to rotate</p>
      </div>
    </div>
  );
};

export default Tetris;