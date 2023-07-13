import classNames from "classnames";

import style from "./RoundOverModal.module.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { nextRoundClicked, quitGameClicked } from "../../store/gameSlice";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import SecondaryOutcomeText from "./SecondaryOutcomeText";
import PrimaryOutcomeText from "./PrimaryOutcomeText";
import { tie } from "../../utils/values";

const rushTransition = {
	background: {
		timeout: 600,
		transitions: {
			CSSPropertyName: "opacity",
			enteredValue: 0.5,
			exitedValue: 0,
		},
	},
	modal: {
		timeout: 600,
		transitions: [
			{
				CSSPropertyName: "left",
				enteringValue: "0px",
				enteredValue: "0px",
				exitingValue: "-120vw",
				exitedValue: "100vw",
			},
			{
				CSSPropertyName: "transform",
				enteringValue: "rotate(0deg) skew(0deg, 0deg)",
				enteredValue: "rotate(0deg) skew(0deg, 0deg)",
				exitingValue: "rotate(10deg) skew(-10deg, -10deg)",
				exitedValue: "rotate(-10deg) skew(10deg, 10deg)",
			},
		],
	},
};

const fadeOutTransition = {
	background: {
		timeout: 600,
		transitions: {
			CSSPropertyName: "opacity",
			enteredValue: 0.5,
			exitedValue: 0,
		},
	},
	modal: {
		timeout: 600,
		transitions: {
			CSSPropertyName: "opacity",
			enteredValue: 1,
			exitedValue: 0,
		},
	},
};

const RoundOverModal = () => {
	const gameStatus = useAppSelector((state) => state.game.gameStatus);
	const gameStarted = useAppSelector((state) => state.game.gameStarted);
	const dispatch = useAppDispatch();

	const winner = gameStatus.roundWinner;
	const player1Mark = gameStatus.player1Mark;
	const isCPU = gameStatus.useCPU;
	const isTie = winner === tie;

	const modalClasses = classNames(style.modalContents, {
		[style.hasSecondaryText]: !isTie,
	});

	return (
		<Modal
			show={Boolean(gameStatus.roundWinner)}
			transitions={gameStarted ? rushTransition : fadeOutTransition}
		>
			{winner ? (
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
			) : null}
		</Modal>
	);
};

export default RoundOverModal;
