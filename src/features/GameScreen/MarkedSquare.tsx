import style from "./Square.module.scss";
import classNames from "classnames";
import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";

import { X, O, Mark } from "../../utils/values";

interface MarkedSquareProps {
	mark: Mark;
	isWinningMark: boolean;
}

const iconMap = {
	X: IconX,
	O: IconO,
	"": "",
};

const MarkedSquare = ({ mark, isWinningMark }: MarkedSquareProps) => {
	const Icon = iconMap[mark || ""];

	const classes = classNames(style.markedSquare, {
		[style.xMark]: mark === X,
		[style.oMark]: mark === O,
		[style.xWon]: mark === X && isWinningMark,
		[style.oWon]: mark === O && isWinningMark,
	});

	return (
		<div className={classes}>{Icon && <Icon className={style.icon} />}</div>
	);
};

export default MarkedSquare;
