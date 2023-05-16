import style from "./TurnBar.module.scss";
import iconRestart from "../../assets/images/icon-restart.svg";
import iconXSilver from "../../assets/images/icon-x-silver.svg";
import logo from "../../assets/images/logo.svg";

const TurnBar = () => {
	return (
		<div className={style.turnBar}>
			<img className={style.logo} src={logo} alt="XO logo" />
			<div className={style.turnDisplay}>
				<div className={style.turnDisplayContents}>
					<img className={style.turnIcon} src={iconXSilver} alt="X" />
					<div className={style.turnText}>Turn</div>
				</div>
			</div>
			<div className={style.restartButton}>
				<img
					className={style.restartIcon}
					src={iconRestart}
					alt="Restart"
				/>
			</div>
		</div>
	);
};

export default TurnBar;
