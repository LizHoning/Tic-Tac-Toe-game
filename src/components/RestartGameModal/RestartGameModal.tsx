import Modal from "../common/Modal";
import Button from "../common/Button";
import style from "./RestartGameModal.module.scss";

const RestartGameModal = () => {
	return (
		<Modal>
			<div className={style.modalContents}>
				<div className={style.text}>Restart game?</div>
				<div className={style.buttons}>
					<Button className={style.button} color="silver">
						No, cancel
					</Button>
					<Button className={style.button} color="yellow">
						Yes, restart
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default RestartGameModal;
