import Square from "./Square";
import style from "./GameBoard.module.scss";
const grid = [
	[0, 1, 2],
	[0, 1, 2],
	[0, 1, 2],
];
const GameBoard = () => {
	return (
		<div className={style.gameBoard}>
			{grid.map((row) => {
				return (
					<div className={style.row}>
						{row.map((item) => {
							return <Square />;
						})}
					</div>
				);
			})}
		</div>
	);
};

export default GameBoard;
