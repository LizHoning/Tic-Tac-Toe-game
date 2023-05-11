import style from "./Square.module.scss";
import iconX from "../../assets/icon-x.svg";

const Square = () => {
	return (
		<div className={style.square}>
			<img className={style.icon} src={iconX} alt="X" />
		</div>
	);
};

export default Square;
