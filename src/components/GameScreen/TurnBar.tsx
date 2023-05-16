import style from "./TurnBar.module.scss";
import iconRestart from "../../assets/images/icon-restart.svg";
import logo from "../../assets/images/logo.svg";

import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";

const TurnBar = () => {
	const TurnIcon = IconX;
	return (
		<div className={style.turnBar}>
			<img className={style.logo} src={logo} alt="XO logo" />
			<div className={style.turnDisplay}>
				<div className={style.turnDisplayContents}>
					<TurnIcon className={style.turnIcon} />
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
