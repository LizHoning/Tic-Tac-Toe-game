import style from "./PrimaryOutcomeText.module.scss";
import classNames from "classnames";
import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";

import { O, X, TIE, WinnerInterface } from "../../components/common/utils";

interface PrimaryOutcomeProps extends WinnerInterface {}

const getIcon = (winner: "O" | "X" | "tie") => {
	if (winner === O) {
		return IconO;
	}
	if (winner === X) {
		return IconX;
	}
	return null;
};

const PrimaryOutcomeText = ({ winner }: PrimaryOutcomeProps) => {
	const Icon = getIcon(winner);

	const classes = classNames(style.primaryOutcomeText, {
		[style.xWon]: winner === X,
		[style.oWon]: winner === O,
		[style.tie]: winner === TIE,
	});

	return (
		<div className={classes}>
			{Icon && (
				<>
					<Icon className={style.icon} />
					<div className={style.text}>takes the round</div>
				</>
			)}
			{winner === TIE && <div className={style.text}>Round tied</div>}
		</div>
	);
};

export default PrimaryOutcomeText;
