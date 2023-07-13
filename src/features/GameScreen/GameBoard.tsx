import style from "./GameBoard.module.scss";
import Square from "./Square/Square";
import { gameBoard } from "../../utils/values";

const GameBoard = () => {
	return (
		<div className={style.gameBoard}>
			{gameBoard.map((row, index) => {
				return (
					<div key={index} className={style.row}>
						{row.map((key) => {
							return <Square key={key} id={key} />;
						})}
					</div>
				);
			})}
		</div>
	);
};

export default GameBoard;
