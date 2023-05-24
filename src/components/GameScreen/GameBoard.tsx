import Square from "./Square";
import style from "./GameBoard.module.scss";
import { X, O, empty, MarkTypes } from "../common/utils";

export interface SquareProps {
	key: string;
	mark: MarkTypes;
	isWinningMark: boolean;
}

const row1: SquareProps[] = [
	{ key: "00", mark: O, isWinningMark: true },
	{ key: "01", mark: O, isWinningMark: true },
	{ key: "02", mark: O, isWinningMark: true },
];

const row2: SquareProps[] = [
	{ key: "10", mark: X, isWinningMark: false },
	{ key: "11", mark: empty, isWinningMark: false },
	{ key: "12", mark: X, isWinningMark: false },
];

const row3: SquareProps[] = [
	{ key: "20", mark: empty, isWinningMark: false },
	{ key: "21", mark: X, isWinningMark: true },
	{ key: "22", mark: empty, isWinningMark: false },
];

const grid: SquareProps[][] = [row1, row2, row3];

const GameBoard = () => {
	const currentPlayerMark = O;
	return (
		<div className={style.gameBoard}>
			{grid.map((row, index) => {
				return (
					<div key={index} className={style.row}>
						{row.map(
							({ key, mark, isWinningMark }: SquareProps) => {
								return (
									<Square
										key={key}
										currentPlayerMark={currentPlayerMark}
										mark={mark}
										isWinningMark={isWinningMark}
									/>
								);
							}
						)}
					</div>
				);
			})}
		</div>
	);
};

export default GameBoard;
