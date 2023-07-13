import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { performCPUMove } from "../../store/gameSlice";

const CPULogic = () => {
	const dispatch = useAppDispatch();
	const currentPlayerMark = useAppSelector(
		(state) => state.game.gameStatus.currentPlayerMark
	);
	const player1Mark = useAppSelector(
		(state) => state.game.gameStatus.player1Mark
	);
	const roundWinner = useAppSelector(
		(state) => state.game.gameStatus.roundWinner
	);

	useEffect(() => {
		// If the round hasn't ended and the current player is
		// the CPU, perform the CPU's move
		if (!roundWinner && currentPlayerMark !== player1Mark) {
			dispatch(performCPUMove());
		}
	}, [currentPlayerMark, player1Mark, roundWinner, dispatch]);

	return null;
};

export default CPULogic;
