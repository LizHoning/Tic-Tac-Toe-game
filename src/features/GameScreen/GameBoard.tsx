import { useSelector } from "react-redux";

import style from "./GameBoard.module.scss";
import type { RootState } from "../../store/store";
import Square from "./Square";

const GameBoard = () => {
	const gameBoard = useSelector((state: RootState) => state.game.gameBoard);

	return (
		<div className={style.gameBoard}>
			{gameBoard.map((row, index) => {
				return (
					<div key={index} className={style.row}>
						{row.map((id) => {
							return <Square key={id} id={id} />;
						})}
					</div>
				);
			})}
		</div>
	);
};

export default GameBoard;
