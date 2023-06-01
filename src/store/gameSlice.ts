import { createSlice, Draft } from "@reduxjs/toolkit";

import {
	X,
	O,
	player1,
	player2,
	playerCPU,
	empty,
	Mark,
	Winner,
	Player,
	PlayerMark,
} from "../components/common/utils";

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
	gameBoard: string[][];
	squares: Squares;
}

const togglePlayerMap: { [key: string]: PlayerMark } = {
	X: O,
	O: X,
};

export const generateInitialState = (): GameState => {
	const gameBoard: string[][] = [
		["00", "01", "02"],
		["10", "11", "12"],
		["20", "21", "22"],
	];

	const squares: Squares = {
		"00": { ...square },
		"01": { ...square },
		"02": { ...square },
		"10": { ...square },
		"11": { ...square },
		"12": { ...square },
		"20": { ...square },
		"21": { ...square },
		"22": { ...square },
	};

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
		gameBoard,
		squares,
	};
};

export const updaters = {
	clearGameBoard: (state: Draft<GameState>) => {
		state.gameBoard.forEach((row: string[]) => {
			row.forEach((squareID) => {
				const square = state.squares[squareID];
				square.mark = empty;
				square.isWinningMark = false;
			});
		});
	},
	resetGameStatus: (state: Draft<GameState>) => {
		const cleanState = generateInitialState();
		state.gameStatus = cleanState.gameStatus;
	},
};

export const gameSlice = createSlice({
	name: "game",
	initialState: generateInitialState(),
	reducers: {
		squareMarked: (state, action) => {
			const currentPlayer = state.gameStatus.currentPlayer;
			const id: string = action.payload.id;
			state.squares[id].mark = currentPlayer;

			// TODO: Check for win
			// If no win, change current player
			state.gameStatus.currentPlayer = togglePlayerMap[currentPlayer];
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
			updaters.clearGameBoard(state);
			state.showRestartGameModal = false;
		},
	},
});

export const {
	squareMarked,
	startGameClicked,
	restartGameModalToggled,
	restartGameClicked,
} = gameSlice.actions;

export default gameSlice.reducer;
