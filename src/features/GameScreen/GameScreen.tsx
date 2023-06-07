import style from "./GameScreen.module.scss";
import TurnBar from "./TurnBar";
import GameBoard from "./GameBoard";
import StatsBar from "./StatsBar";
import RoundOverModal from "../RoundOverModal/RoundOverModal";
import RestartGameModal from "../RestartGameModal/RestartGameModal";

const GameScreen = () => {
	return (
		<>
			<div className={style.gameScreen}>
				<TurnBar />
				<GameBoard />
				<StatsBar />
			</div>
			<RoundOverModal />
			<RestartGameModal />
		</>
	);
};

export default GameScreen;
