import style from "./StatsBar.module.scss";
import { useAppSelector } from "../../store/hooks";
import { X, O, PlayerMark } from "../../utils/values";

type PlayerTitle = "p1" | "p2" | "you" | "cpu";

const getPlayerTitle = (
	mark: PlayerMark,
	player1Mark: PlayerMark,
	useCPU: boolean
) => {
	const isPlayer1 = mark === player1Mark;

	if (useCPU) {
		return isPlayer1 ? "you" : "cpu";
	}

	return isPlayer1 ? "p1" : "p2";
};

const StatsBar = () => {
	const gameStatus = useAppSelector((state) => state.game.gameStatus);
	const player1Mark = gameStatus.player1Mark;
	const useCPU = gameStatus.useCPU;

	const xPlayerTitle: PlayerTitle = getPlayerTitle(X, player1Mark, useCPU);
	const oPlayerTitle: PlayerTitle = getPlayerTitle(O, player1Mark, useCPU);

	return (
		<div className={style.statsBar}>
			<div className={style.xBlock}>
				<div className={style.blockContent}>
					<div className={style.title}>{`X (${xPlayerTitle})`}</div>
					<div className={style.count} title="Player X win count">
						{gameStatus.wins.X}
					</div>
				</div>
			</div>
			<div className={style.tiesBlock}>
				<div className={style.blockContent}>
					<div className={style.title}>Ties</div>
					<div className={style.count} title="Tie count">
						{gameStatus.wins.ties}
					</div>
				</div>
			</div>
			<div className={style.yBlock}>
				<div className={style.blockContent}>
					<div className={style.title}>{`O (${oPlayerTitle})`}</div>
					<div className={style.count} title="Player O win count">
						{gameStatus.wins.O}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StatsBar;
