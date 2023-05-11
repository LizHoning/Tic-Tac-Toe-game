import style from "./RoundOverModal.module.scss";
import Button from "../common/Button";

const RoundOverModal = () => {
	return (
		<>
			<div className={style.background} />
			<div className={style.modalContainer}>
				<div className={style.modal}>
					<div className={style.buttons}>
						<Button text="sdfsdf" />
						<Button className={style.btnColour} text="mehmeh" />
						<div className={style.quitButton}>Quit</div>
						<div className={style.nextRoundButton}>Next round</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoundOverModal;
