import style from "./NewGameScreen.module.scss";
import logo from "../../assets/images/logo.svg";
import Button from "../common/Button";

import iconX from "../../assets/images/icon-x-silver.svg";
import iconO from "../../assets/images/icon-o-navy.svg";

const NewGameScreen = () => {
	return (
		<div className={style.newGameScreen}>
			<img className={style.logo} src={logo} alt="XO logo" />
			<div className={style.playerSelector}>
				<div className={style.instructionText}>
					Pick player 1's mark
				</div>
				<div className={style.playerSelectorContainer}>
					<div className={style.selectX}>
						<img className={style.icon} src={iconX} alt="X" />
					</div>
					<div className={style.selectO}>
						<img className={style.icon} src={iconO} alt="O" />
					</div>
				</div>
				<div className={style.reminderText}>
					Remember : X goes first
				</div>
			</div>
			<div className={style.buttons}>
				<Button className={style.btn} color="yellow">
					New game (vs CPU)
				</Button>
				<Button className={style.btn} color="blue">
					New game (vs Player)
				</Button>
			</div>
		</div>
	);
};

export default NewGameScreen;
