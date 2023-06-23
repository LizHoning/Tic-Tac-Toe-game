import { createSlice } from "@reduxjs/toolkit";

import {
	X,
	O,
	tie,
	empty,
	Mark,
	Winner,
	PlayerMark,
	squareKeys,
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

export const gameSlice = createSlice({
	name: "game",
	initialState: generateInitialState(),
	reducers: {
		squareMarked: (state, action) => {
			const currentPlayer = state.gameStatus.currentPlayerMark;
			const id: string = action.payload.id;
			state.squares[id].mark = currentPlayer;

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
				state.gameStatus.currentPlayerMark =
					togglePlayerMap[currentPlayer];
			}
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
	},
});

export const {
	squareMarked,
	startGameClicked,
	restartGameModalToggled,
	restartGameClicked,
	quitGameClicked,
	nextRoundClicked,
} = gameSlice.actions;

export default gameSlice.reducer;
