import style from "./NewGameScreen.module.scss";
import logo from "../../assets/images/logo.svg";
import Button from "../common/Button";

import PlayerSelector from "./PlayerSelector";

const NewGameScreen = () => {
	return (
		<div className={style.newGameScreen}>
			<img className={style.logo} src={logo} alt="XO logo" />
			<PlayerSelector />
			<div className={style.buttons}>
				<Button className={style.button} color="yellow">
					New game (vs CPU)
				</Button>
				<Button className={style.button} color="blue">
					New game (vs Player)
				</Button>
			</div>
		</div>
	);
};

export default NewGameScreen;
