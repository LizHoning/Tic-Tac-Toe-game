export const O = "O";
export const X = "X";
export const empty = "";
export const tie = "tie";

export const squareKeys = {
	topLeft: "top-left",
	topMiddle: "top-middle",
	topRight: "top-right",
	middleLeft: "middle-left",
	middle: "middle",
	middleRight: "middle-right",
	bottomLeft: "bottom-left",
	bottomMiddle: "bottom-middle",
	bottomRight: "bottom-right",
};

const {
	topLeft,
	topMiddle,
	topRight,
	middleLeft,
	middle,
	middleRight,
	bottomLeft,
	bottomMiddle,
	bottomRight,
} = squareKeys;

export const gameBoard: string[][] = [
	[topLeft, topMiddle, topRight],
	[middleLeft, middle, middleRight],
	[bottomLeft, bottomMiddle, bottomRight],
];

// An easy testable way of identifying the winning lines.
// For such a small board (3x3) it makes sense to use this method.
export const winningCombinations = [
	[topLeft, topMiddle, topRight],
	[middleLeft, middle, middleRight],
	[bottomLeft, bottomMiddle, bottomRight],
	[topLeft, middleLeft, bottomLeft],
	[topMiddle, middle, bottomMiddle],
	[topRight, middleRight, bottomRight],
	[topLeft, middle, bottomRight],
	[topRight, middle, bottomLeft],
];

export type Winner = "X" | "O" | "tie" | null;
export type Outcome = "X" | "O" | "tie";
export type Mark = "X" | "O" | "";
export type PlayerMark = "X" | "O";
