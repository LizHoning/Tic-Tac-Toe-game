import classNames from "classnames";
import { useSelector } from "react-redux";

import style from "./RoundOverModal.module.scss";
import Modal from "../common/Modal";
import Button from "../common/Button";
import SecondaryOutcomeText from "./SecondaryOutcomeText";
import PrimaryOutcomeText from "./PrimaryOutcomeText";
import type { RootState } from "../../store/store";
import { O, X, player1 as p1, tie } from "../../components/common/utils";

const RoundOverModal = () => {
	const gameStatus = useSelector((state: RootState) => state.game.gameStatus);

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
