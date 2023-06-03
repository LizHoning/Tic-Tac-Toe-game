import classNames from "classnames";

import style from "./RoundOverModal.module.scss";
import { useAppSelector } from "../../store/hooks";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import SecondaryOutcomeText from "./SecondaryOutcomeText";
import PrimaryOutcomeText from "./PrimaryOutcomeText";
import { O, X, player1 as p1, tie } from "../../utils/values";

const RoundOverModal = () => {
	const gameStatus = useAppSelector((state) => state.game.gameStatus);

	if (!gameStatus.winner) return null;

	const winner = gameStatus.winner;
	const player1 = gameStatus.X.player === p1 ? X : O;
	const isCPU = gameStatus.useCPU;
	const isTie = winner === tie;

	const modalClasses = classNames(style.modalContents, {
		[style.hasSecondaryText]: !isTie,
	});

	return (
		<Modal>
			<div className={modalClasses}>
				{!isTie && (
					<SecondaryOutcomeText
						winner={winner}
						player1={player1}
						isCPU={isCPU}
					/>
				)}
				<PrimaryOutcomeText winner={winner} />
				<div className={style.buttons}>
					<Button className={style.button} color="silver">
						Quit
					</Button>
					<Button className={style.button} color="yellow">
						Next round
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default RoundOverModal;
