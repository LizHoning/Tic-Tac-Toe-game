import classNames from "classnames";

import style from "./MarkIcon.module.scss";
import { O, X, Mark } from "../../../utils/values";
import { ReactComponent as IconX } from "../../../assets/images/icon-x.svg";
import { ReactComponent as IconO } from "../../../assets/images/icon-o.svg";
import { ReactComponent as IconXOutline } from "../../../assets/images/icon-x-outline.svg";
import { ReactComponent as IconOOutline } from "../../../assets/images/icon-o-outline.svg";

const iconMap = {
	X: IconX,
	O: IconO,
	"": null,
};

const outlineIconMap = {
	X: IconXOutline,
	O: IconOOutline,
	"": null,
};

interface MarkIconProps {
	mark: Mark;
	isWinningMark?: boolean;
	isOutline?: boolean;
}

const MarkIcon = ({ mark, isWinningMark, isOutline }: MarkIconProps) => {
	const Icon = isOutline ? outlineIconMap[mark || ""] : iconMap[mark || ""];

	const classes = classNames(style.icon, {
		[style.xMark]: !isWinningMark && mark === X,
		[style.oMark]: !isWinningMark && mark === O,
	});

	return Icon ? <Icon className={classes} /> : null;
};

export default MarkIcon;
