import style from "./RoundOverModal.module.scss";
import Button from "../common/Button";
import iconX from "../../assets/images/icon-x.svg";
import iconO from "../../assets/images/icon-o.svg";

const RoundOverModal = () => {
	return (
		<>
			<div className={style.background} />
			<div className={style.modalContainer}>
				<div className={style.modal}>
					<div className={style.secondaryOutcomeText}>You won!</div>
					<div className={style.primaryOutcomeText}>
						<img className={style.icon} src={iconX} alt="X" />
						<div className={style.text}>takes the round</div>
					</div>
					<div className={style.buttons}>
						<Button>Quit</Button>
						<Button className={style.btnColour}>Next round</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoundOverModal;
