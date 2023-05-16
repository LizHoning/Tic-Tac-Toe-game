import style from "./RoundOverModal.module.scss";
import Button from "../common/Button";

import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";

const RoundOverModal = () => {
	const Icon = IconO;
	return (
		<>
			<div className={style.background} />
			<div className={style.modalContainer}>
				<div className={style.modal}>
					<div className={style.secondaryOutcomeText}>You won!</div>
					<div className={style.primaryOutcomeText}>
						<Icon className={style.icon} />
						<div className={style.text}>takes the round</div>
					</div>
					<div className={style.buttons}>
						<Button color="silver">Quit</Button>
						<Button color="yellow">Next round</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoundOverModal;
