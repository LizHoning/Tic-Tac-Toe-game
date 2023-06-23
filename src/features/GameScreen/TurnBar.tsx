import style from "./TurnBar.module.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { restartGameModalToggled } from "../../store/gameSlice";
import iconRestart from "../../assets/images/icon-restart.svg";
import logo from "../../assets/images/logo.svg";
import Button from "../Button/Button";
import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";

const iconMap = {
	X: IconX,
	O: IconO,
	"": null,
};

const TurnBar = () => {
	const currentPlayerMark = useAppSelector(
		(state) => state.game.gameStatus.currentPlayerMark
	);
	const dispatch = useAppDispatch();

	const TurnIcon = iconMap[currentPlayerMark || ""];

	return (
		<div className={style.turnBar}>
			<img src={logo} alt="XO logo" />
			<div className={style.turnDisplay}>
				<div
					title="Current player"
					className={style.turnDisplayContents}
				>
					<TurnIcon className={style.turnIcon} />
					<div className={style.turnText}>Turn</div>
				</div>
			</div>
			<Button
				color="silver"
				className={style.restartButton}
				onClick={() =>
					dispatch(restartGameModalToggled({ show: true }))
				}
			>
				<img src={iconRestart} alt="Restart" />
			</Button>
		</div>
	);
};

export default TurnBar;
