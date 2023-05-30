import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../store/store";
import {
	restartGameModalToggled,
	restartGameClicked,
} from "../../store/gameSlice";
import Modal from "../common/Modal";
import Button from "../common/Button";
import style from "./RestartGameModal.module.scss";

const RestartGameModal = () => {
	const showRestartGameModal = useSelector(
		(state: RootState) => state.game.showRestartGameModal
	);
	const dispatch = useDispatch();

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
