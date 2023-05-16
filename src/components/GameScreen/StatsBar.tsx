import style from "./StatsBar.module.scss";

const StatsBar = () => {
	return (
		<div className={style.statsBar}>
			<div className={style.xBlock}>
				<div className={style.blockContent}>
					<div className={style.title}>X (you)</div>
					<div className={style.count}>20</div>
				</div>
			</div>
			<div className={style.tiesBlock}>
				<div className={style.blockContent}>
					<div className={style.title}>Ties</div>
					<div className={style.count}>20</div>
				</div>
			</div>
			<div className={style.yBlock}>
				<div className={style.blockContent}>
					<div className={style.title}>O (CPU)</div>
					<div className={style.count}>20</div>
				</div>
			</div>
		</div>
	);
};

export default StatsBar;
