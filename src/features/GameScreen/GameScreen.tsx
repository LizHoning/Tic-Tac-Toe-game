import style from "./GameScreen.module.scss";
import TurnBar from "./TurnBar";
import GameBoard from "./GameBoard";
import StatsBar from "./StatsBar";

const GameScreen = () => {
	return (
		<div className={style.gameScreen}>
			<TurnBar />
			<GameBoard />
			<StatsBar />
		</div>
	);
};

export default GameScreen;
