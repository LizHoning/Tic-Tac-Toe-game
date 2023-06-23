import { useState } from "react";

import style from "./NewGameScreen.module.scss";
import { useAppDispatch } from "../../store/hooks";
import { startGameClicked } from "../../store/gameSlice";
import logo from "../../assets/images/logo.svg";
import Button from "../Button/Button";
import MarkSelector from "./MarkSelector";
import { X, PlayerMark } from "../../utils/values";

const NewGameScreen = () => {
	const [selectedMark, updateSelectedMark] = useState<PlayerMark>(X);
	const dispatch = useAppDispatch();

	const handleButtonClick = (useCPU: boolean = false) => {
		dispatch(startGameClicked({ player1Mark: selectedMark, useCPU }));
	};

	return (
		<div className={style.newGameScreen}>
			<img className={style.logo} src={logo} alt="XO logo" />
			<MarkSelector
				selectedMark={selectedMark}
				onPlayerClick={updateSelectedMark}
			/>
			<div className={style.buttons}>
				<Button
					onClick={() => handleButtonClick(true)}
					className={style.button}
					color="yellow"
				>
					New game (vs CPU)
				</Button>
				<Button
					onClick={() => handleButtonClick()}
					className={style.button}
					color="blue"
				>
					New game (vs Player)
				</Button>
			</div>
		</div>
	);
};

export default NewGameScreen;
