import style from "./Logo.module.scss";
import iconX from "../../assets/icon-x.svg";
import iconY from "../../assets/icon-o.svg";

const Logo = () => {
	return (
		<div className={style.logo}>
			<img className={style.icon} src={iconX} alt="X" />
			<img className={style.icon} src={iconY} alt="O" />
		</div>
	);
};

export default Logo;
