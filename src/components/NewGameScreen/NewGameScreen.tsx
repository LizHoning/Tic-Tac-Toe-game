import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./NewGameScreen.module.scss";
import { startGameClicked } from "../../store/gameSlice";
import logo from "../../assets/images/logo.svg";
import Button from "../common/Button";
import MarkSelector from "./MarkSelector";
import { X, player2, playerCPU, PlayerMark, Player2 } from "../common/utils";

const NewGameScreen = () => {
	const [selectedMark, updateSelectedMark] = useState<PlayerMark>(X);
	const dispatch = useDispatch();

	const handleButtonClick = (opponent: Player2) => {
		dispatch(startGameClicked({ player1Mark: selectedMark, opponent }));
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
					onClick={() => handleButtonClick(playerCPU)}
					className={style.button}
					color="yellow"
				>
					New game (vs CPU)
				</Button>
				<Button
					onClick={() => handleButtonClick(player2)}
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
