import style from "./Square.module.scss";
import { useAppSelector } from "../../store/hooks";
import { ReactComponent as IconXOutline } from "../../assets/images/icon-x-outline.svg";
import { ReactComponent as IconOOutline } from "../../assets/images/icon-o-outline.svg";

const iconMap = {
	X: IconXOutline,
	O: IconOOutline,
	"": null,
};

const IconOutline = () => {
	const currentPlayerMark = useAppSelector(
		(state) => state.game.gameStatus.currentPlayer
	);

	const Icon = iconMap[currentPlayerMark || ""];

	return Icon ? <Icon className={style.icon} /> : null;
};

export default IconOutline;
