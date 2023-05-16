import style from "./Square.module.scss";
import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";

const Square = () => {
	return (
		<div className={style.square}>
			<IconX className={style.icon} />
		</div>
	);
};

export default Square;
