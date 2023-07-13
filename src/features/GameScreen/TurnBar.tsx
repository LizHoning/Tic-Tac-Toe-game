import style from "./TurnBar.module.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { restartGameModalToggled } from "../../store/gameSlice";
import iconRestart from "../../assets/images/icon-restart.svg";
import logo from "../../assets/images/logo.svg";
import Button from "../Button/Button";
import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";
import TransitionWrapper from "../TransitionWrapper";

import { X, O } from "../../utils/values";

const transitionProps = {
	timeout: 300,
	transitions: {
		CSSPropertyName: "opacity",
		enteredValue: 1,
		exitedValue: 0,
	},
};

const TurnBar = () => {
	const currentPlayerMark = useAppSelector(
		(state) => state.game.gameStatus.currentPlayerMark
	);
	const dispatch = useAppDispatch();

	return (
		<div className={style.turnBar}>
			<img src={logo} alt="XO logo" />
			<div className={style.turnDisplay}>
				<div
					title="Current player"
					className={style.turnDisplayContents}
				>
					<div className={style.iconContainer}>
						<TransitionWrapper
							show={currentPlayerMark === X}
							{...transitionProps}
						>
							<IconX className={style.turnIcon} />
						</TransitionWrapper>
						<TransitionWrapper
							show={currentPlayerMark === O}
							{...transitionProps}
						>
							<IconO className={style.turnIcon} />
						</TransitionWrapper>
					</div>
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
