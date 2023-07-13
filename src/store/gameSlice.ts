import { createSlice, Draft } from "@reduxjs/toolkit";

import {
	X,
	O,
	tie,
	empty,
	Mark,
	Winner,
	PlayerMark,
	squareKeys,
	corners,
	sides,
	winningCombinations,
} from "../utils/values";

interface Square {
	mark: Mark;
	isWinningMark: boolean;
}

const square: Square = { mark: empty, isWinningMark: false };

type Squares = {
	[key: string]: Square;
};

interface GameStatus {
	wins: {
		X: number;
		O: number;
		ties: number;
	};
	roundWinner: Winner;
	useCPU: boolean;
	player1Mark: PlayerMark;
	currentPlayerMark: PlayerMark;
}

export interface GameState {
	gameStatus: GameStatus;
	gameStarted: boolean;
	showRestartGameModal: boolean;
	squares: Squares;
}

interface WeightedMoves {
	[key: string]: number;
}

const togglePlayerMap: { [key: string]: PlayerMark } = {
	X: O,
	O: X,
};

export const generateInitialState = (): GameState => {
	const squares: Squares = {};
	Object.values(squareKeys).forEach((val) => {
		squares[val] = { ...square };
	});

	const gameStatus: GameStatus = {
		wins: {
			X: 0,
			O: 0,
			ties: 0,
		},
		roundWinner: null,
		useCPU: false,
		player1Mark: X,
		currentPlayerMark: X,
	};

	return {
		gameStatus,
		gameStarted: false,
		showRestartGameModal: false,
		squares,
	};
};

const getRandomPosition = (positions: string[]) => {
	if (!positions.length) {
		return null;
	}

	if (positions.length === 1) {
		return positions[0];
	}

	const index = Math.floor(Math.random() * positions.length);

	return positions[index];
};

const setMark = (state: Draft<GameState>, position: string) => {
	const currentPlayer = state.gameStatus.currentPlayerMark;
	state.squares[position].mark = currentPlayer;

	checkIfGameOver(state);
};

const incrementVal = (currentVal: number, val: number) => {
	return currentVal ? currentVal + val : val;
};

const checkIfGameOver = (state: Draft<GameState>) => {
	const currentPlayer = state.gameStatus.currentPlayerMark;
	let gameWon = false;
	winningCombinations.forEach((combo) => {
		const isWinningLine = combo.every(
			(key) => currentPlayer === state.squares[key].mark
		);

		if (isWinningLine) {
			gameWon = true;
			combo.forEach((key) => {
				const square = state.squares[key];
				square.isWinningMark = true;
			});
		}
	});

	const allSquaresFilled = Object.values(state.squares)
		.map((square) => Boolean(square.mark))
		.every((hasMark) => hasMark);

	if (allSquaresFilled && !gameWon) {
		// If board is full and neither player has a winning line,
		// the game has ended in a tie
		state.gameStatus.wins.ties++;
		state.gameStatus.roundWinner = tie;
	} else if (gameWon) {
		// The current player has won the game
		state.gameStatus.wins[currentPlayer]++;
		state.gameStatus.roundWinner = currentPlayer;
	} else {
		// The game continues & the other player is now the current player
		state.gameStatus.currentPlayerMark = togglePlayerMap[currentPlayer];
	}
};

const calculateCPUPosition = (state: Draft<GameState>) => {
	const cpuMark = state.gameStatus.currentPlayerMark;
	const humanMark = togglePlayerMap[cpuMark];

	const currentMarks = Object.values(state.squares).map(
		(square) => square.mark
	);

	// If the board is empty, choose mark placement from
	// anywhere on the board
	if (currentMarks.every((mark) => mark === empty)) {
		// 1/3 chance for corner, side or middle
		const num = Math.ceil(Math.random() * 3);

		if (num === 1) {
			return getRandomPosition(corners);
		} else if (num === 2) {
			return getRandomPosition(sides);
		}

		return squareKeys.middle;
	}

	const winningPositions: string[] = [];
	const blockingPositions: string[] = [];
	const validMoves: string[] = [];

	const weighedMoves: WeightedMoves = {};

	winningCombinations.forEach((combo) => {
		const comboSquares = combo.map((position) => ({
			mark: state.squares[position].mark,
			position,
		}));

		const hasCpuMark = comboSquares.filter((item) => item.mark === cpuMark);
		const hasHumanMark = comboSquares.filter(
			(item) => item.mark === humanMark
		);
		const hasEmptyMark = comboSquares
			.filter((item) => item.mark === empty)
			.map((item) => item.position);

		// The CPU has two marks in this combo line and the third is empty,
		// meaning that it will win if it takes the third spot
		if (hasCpuMark.length === 2 && hasEmptyMark.length === 1) {
			winningPositions.push(hasEmptyMark[0]);
		}

		// The human player has two marks in this combo line and the third
		// is empty, meaning that they could win next round if the CPU
		// doesn't block them now
		if (hasHumanMark.length === 2 && hasEmptyMark.length === 1) {
			blockingPositions.push(hasEmptyMark[0]);
		}

		// The CPU player has one mark in the line and the other two
		// spaces are empty, making it an excellent candidate to set up a combo
		if (hasCpuMark.length === 1 && hasEmptyMark.length === 2) {
			hasEmptyMark.forEach((mark: string) => {
				weighedMoves[mark] = incrementVal(weighedMoves[mark], 3);
			});
		}

		// Completely unmarked line, good for setting up a combo
		if (hasEmptyMark.length === 3) {
			hasEmptyMark.forEach((mark: string) => {
				weighedMoves[mark] = incrementVal(weighedMoves[mark], 2);
			});
		}

		// The human player has one mark in the line and the other two
		// spaces are empty, so we might want to place a blocking mark here
		if (hasHumanMark.length === 1 && hasEmptyMark.length === 2) {
			hasEmptyMark.forEach((mark: string) => {
				weighedMoves[mark] = incrementVal(weighedMoves[mark], 1);
			});
		}

		validMoves.push(...hasEmptyMark);
	});

	if (winningPositions.length) {
		// No point in thinking about this because we're about to win!
		return getRandomPosition(winningPositions);
	} else if (blockingPositions.length) {
		// Block the human if they're about to win
		return getRandomPosition(blockingPositions);
	} else if (Object.keys(weighedMoves).length) {
		const highestWeight = Object.values(weighedMoves).reduce(
			(currentMax, value) => {
				if (value > currentMax) return value;
				return currentMax;
			},
			0
		);

		const bestPositions = Object.keys(weighedMoves).filter(
			(key) => weighedMoves[key] === highestWeight
		);

		return getRandomPosition(bestPositions);
	} else if (validMoves.length) {
		return getRandomPosition(validMoves);
	}

	return null;
};

export const gameSlice = createSlice({
	name: "game",
	initialState: generateInitialState(),
	reducers: {
		squareMarked: (state, action) => {
			setMark(state, action.payload.id);
		},
		startGameClicked: (state, action) => {
			const player1Mark: PlayerMark = action.payload.player1Mark;
			state.gameStatus.player1Mark = player1Mark;
			state.gameStatus.useCPU = action.payload.useCPU;
			state.gameStarted = true;
		},
		restartGameModalToggled: (state, action) => {
			state.showRestartGameModal = action.payload.show;
		},
		restartGameClicked: (state) => {
			const cleanState = generateInitialState();
			state.squares = cleanState.squares;
			state.gameStatus.currentPlayerMark = X;
			state.showRestartGameModal = false;
		},
		quitGameClicked: (state) => {
			const cleanState = generateInitialState();
			state.gameStatus = cleanState.gameStatus;
			state.squares = cleanState.squares;
			state.gameStarted = false;
		},
		nextRoundClicked: (state) => {
			const cleanState = generateInitialState();
			state.squares = cleanState.squares;
			state.gameStatus.roundWinner = null;
			state.gameStatus.currentPlayerMark = X;
		},
		performCPUMove: (state) => {
			// There's an issue with useEffect being called twice on mount,
			// so double check that we ARE the CPU player here
			if (
				state.gameStatus.currentPlayerMark !==
				state.gameStatus.player1Mark
			) {
				const position = calculateCPUPosition(state);

				if (position) {
					setMark(state, position);
				}
			}
		},
	},
});

export const {
	squareMarked,
	startGameClicked,
	restartGameModalToggled,
	restartGameClicked,
	quitGameClicked,
	nextRoundClicked,
	performCPUMove,
} = gameSlice.actions;

export default gameSlice.reducer;
