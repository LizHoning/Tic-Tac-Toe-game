import { useSelector } from "react-redux";

import type { RootState } from "../../store/store";
import { ReactComponent as IconXOutline } from "../../assets/images/icon-x-outline.svg";
import { ReactComponent as IconOOutline } from "../../assets/images/icon-o-outline.svg";
import style from "./Square.module.scss";

const iconMap = {
	X: IconXOutline,
	O: IconOOutline,
	"": null,
};

const IconOutline = () => {
	const currentPlayerMark = useSelector(
		(state: RootState) => state.game.gameStatus.currentPlayer
	);

	const Icon = iconMap[currentPlayerMark || ""];

	return Icon ? <Icon className={style.icon} /> : null;
};

export default IconOutline;
