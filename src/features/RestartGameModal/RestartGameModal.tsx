import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
	restartGameModalToggled,
	restartGameClicked,
} from "../../store/gameSlice";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import style from "./RestartGameModal.module.scss";

const modalTransitions = {
	background: {
		timeout: 400,
		transitions: {
			CSSPropertyName: "opacity",
			enteredValue: 0.5,
			exitedValue: 0,
		},
	},
	modal: {
		timeout: 400,
		transitions: {
			CSSPropertyName: "opacity",
			enteredValue: 1,
			exitedValue: 0,
		},
	},
};

const RestartGameModal = () => {
	const showRestartGameModal = useAppSelector(
		(state) => state.game.showRestartGameModal
	);
	const dispatch = useAppDispatch();

	return (
		<Modal show={showRestartGameModal} transitions={modalTransitions}>
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
