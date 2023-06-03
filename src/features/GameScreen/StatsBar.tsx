import { useSelector } from "react-redux";

import style from "./StatsBar.module.scss";
import type { RootState } from "../../store/store";
import { player1, playerYou, playerCPU } from "../../utils/values";

type PlayerTitle = "p1" | "p2" | "you" | "cpu";

const StatsBar = () => {
	const gameStatus = useSelector((state: RootState) => state.game.gameStatus);

	let xPlayerTitle: PlayerTitle = gameStatus.X.player;
	let oPlayerTitle: PlayerTitle = gameStatus.O.player;

	if (gameStatus.useCPU) {
		xPlayerTitle = xPlayerTitle === player1 ? playerYou : playerCPU;
		oPlayerTitle = oPlayerTitle === player1 ? playerYou : playerCPU;
	}

	return (
		<div className={style.statsBar}>
			<div className={style.xBlock}>
				<div className={style.blockContent}>
					<div className={style.title}>{`X (${xPlayerTitle})`}</div>
					<div className={style.count}>{gameStatus.X.wins}</div>
				</div>
			</div>
			<div className={style.tiesBlock}>
				<div className={style.blockContent}>
					<div className={style.title}>Ties</div>
					<div className={style.count}>{gameStatus.ties}</div>
				</div>
			</div>
			<div className={style.yBlock}>
				<div className={style.blockContent}>
					<div className={style.title}>{`O (${oPlayerTitle})`}</div>
					<div className={style.count}>{gameStatus.O.wins}</div>
				</div>
			</div>
		</div>
	);
};

export default StatsBar;
