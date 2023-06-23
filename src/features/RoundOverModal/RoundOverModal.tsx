import classNames from "classnames";

import style from "./RoundOverModal.module.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { nextRoundClicked, quitGameClicked } from "../../store/gameSlice";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import SecondaryOutcomeText from "./SecondaryOutcomeText";
import PrimaryOutcomeText from "./PrimaryOutcomeText";
import { tie } from "../../utils/values";

const RoundOverModal = () => {
	const gameStatus = useAppSelector((state) => state.game.gameStatus);
	const dispatch = useAppDispatch();

	if (!gameStatus.roundWinner) return null;

	const winner = gameStatus.roundWinner;
	const player1Mark = gameStatus.player1Mark;
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
						player1={player1Mark}
						isCPU={isCPU}
					/>
				)}
				<PrimaryOutcomeText winner={winner} />
				<div className={style.buttons}>
					<Button
						onClick={() => dispatch(quitGameClicked())}
						className={style.button}
						color="silver"
					>
						Quit
					</Button>
					<Button
						onClick={() => dispatch(nextRoundClicked())}
						className={style.button}
						color="yellow"
					>
						Next round
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default RoundOverModal;
