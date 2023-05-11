import style from "./StatsBar.module.scss";

const StatsBar = () => {
	return (
		<div className={style.statsBar}>
			<div className={style.xBlock}></div>
			<div className={style.tiesBlock}></div>
			<div className={style.yBlock}></div>
		</div>
	);
};

export default StatsBar;
