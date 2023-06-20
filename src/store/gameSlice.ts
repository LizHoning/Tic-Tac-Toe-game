import { createSlice } from "@reduxjs/toolkit";

import {
	X,
	O,
	tie,
	player1,
	player2,
	playerCPU,
	empty,
	Mark,
	Winner,
	Player,
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

interface PlayerStatus {
	player: Player;
	wins: number;
}

interface GameStatus {
	X: PlayerStatus;
	O: PlayerStatus;
	winner: Winner;
	ties: number;
	useCPU: boolean;
	currentPlayer: "X" | "O";
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
		X: {
			player: player1,
			wins: 0,
		},
		O: {
			player: player2,
			wins: 0,
		},
		winner: null,
		ties: 0,
		useCPU: false,
		currentPlayer: X,
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
			const currentPlayer = state.gameStatus.currentPlayer;
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
				state.gameStatus.ties++;
				state.gameStatus.winner = tie;
			} else if (gameWon) {
				// The current player has won the game
				state.gameStatus[currentPlayer].wins++;
				state.gameStatus.winner = currentPlayer;
			} else {
				// The game continues & the other player is now the current player
				state.gameStatus.currentPlayer = togglePlayerMap[currentPlayer];
			}
		},
		startGameClicked: (state, action) => {
			const player1Mark: PlayerMark = action.payload.player1Mark;
			const opponent = action.payload.opponent;
			const opponentMark = togglePlayerMap[player1Mark];

			state.gameStatus[player1Mark].player = player1;
			state.gameStatus[opponentMark].player = player2;
			state.gameStatus.useCPU = opponent === playerCPU;
			state.gameStarted = true;
		},
		restartGameModalToggled: (state, action) => {
			state.showRestartGameModal = action.payload.show;
		},
		restartGameClicked: (state) => {
			const cleanState = generateInitialState();
			state.squares = cleanState.squares;
			state.gameStatus.currentPlayer = X;
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
			state.gameStatus.winner = null;
			state.gameStatus.currentPlayer = X;
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
