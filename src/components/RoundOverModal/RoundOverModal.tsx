import style from "./RoundOverModal.module.scss";
import classNames from "classnames";
import Button from "../common/Button";
import SecondaryOutcomeText from "./SecondaryOutcomeText";
import PrimaryOutcomeText from "./PrimaryOutcomeText";

import { O, X, TIE } from "../../components/common/utils";

const RoundOverModal = () => {
	// Temporary values for testing states
	const winner = O;
	const player1 = O;
	const isCPU = false;

	// Temporarily ignoring error detected when using hard-coded
	// testing values
	// @ts-expect-error
	const isTie = winner === TIE;

	const modalClasses = classNames(style.modal, {
		[style.hasSecondaryText]: !isTie,
	});

	return (
		<>
			<div className={style.background} />
			<div className={style.modalContainer}>
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
			</div>
		</>
	);
};

export default RoundOverModal;
