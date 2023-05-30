import style from "./SecondaryOutcomeText.module.scss";
import { tie, PlayerMark, Outcome } from "../../components/common/utils";

interface SecondaryOutcomeProps {
	winner: Outcome;
	player1: PlayerMark;
	isCPU: boolean;
}

const getText = ({ winner, player1, isCPU }: SecondaryOutcomeProps) => {
	if (winner === tie) {
		return null;
	}

	const player1Won = winner === player1;

	if (isCPU) {
		if (player1Won) {
			return "You won!";
		}

		return "Oh no, you lost...";
	}

	const playerNum = player1Won ? "1" : "2";

	return `Player ${playerNum} wins!`;
};

const SecondaryOutcomeText = (props: SecondaryOutcomeProps) => {
	const text = getText(props);

	return (
		<>{text && <div className={style.secondaryOutcomeText}>{text}</div>}</>
	);
};

export default SecondaryOutcomeText;
