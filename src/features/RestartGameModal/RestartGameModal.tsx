import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
	restartGameModalToggled,
	restartGameClicked,
} from "../../store/gameSlice";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import style from "./RestartGameModal.module.scss";

const RestartGameModal = () => {
	const showRestartGameModal = useAppSelector(
		(state) => state.game.showRestartGameModal
	);
	const dispatch = useAppDispatch();

	if (!showRestartGameModal) return null;

	return (
		<Modal>
			<div className={style.modalContents}>
				<div className={style.text}>Restart game?</div>
				<div className={style.buttons}>
					<Button
						onClick={() =>
							dispatch(restartGameModalToggled({ show: false }))
						}
						className={style.button}
						color="silver"
					>
						No, cancel
					</Button>
					<Button
						onClick={() => dispatch(restartGameClicked())}
						className={style.button}
						color="yellow"
					>
						Yes, restart
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default RestartGameModal;
