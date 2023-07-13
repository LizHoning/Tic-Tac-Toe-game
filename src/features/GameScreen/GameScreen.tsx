import style from "./GameScreen.module.scss";
import TurnBar from "./TurnBar";
import GameBoard from "./GameBoard";
import StatsBar from "./StatsBar";
import RoundOverModal from "../RoundOverModal/RoundOverModal";
import RestartGameModal from "../RestartGameModal/RestartGameModal";
import CPULogic from "./CPULogic";

import { useAppSelector } from "../../store/hooks";

const GameScreen = () => {
	const useCPU = useAppSelector((state) => state.game.gameStatus.useCPU);
	return (
		<>
			<div className={style.gameScreen}>
				<TurnBar />
				<GameBoard />
				<StatsBar />
			</div>
			<RoundOverModal />
			<RestartGameModal />
			{useCPU && <CPULogic />}
		</>
	);
};

export default GameScreen;
