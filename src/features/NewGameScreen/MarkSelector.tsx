import classNames from "classnames";

import style from "./MarkSelector.module.scss";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";
import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { X, O, PlayerMark } from "../../utils/values";

interface MarkSelectorProps {
	selectedMark: PlayerMark;
	onPlayerClick: Function;
}

const MarkSelector = ({ selectedMark, onPlayerClick }: MarkSelectorProps) => {
	const selectorXClasses = classNames(style.selectButton, {
		[style.unselected]: selectedMark === O,
	});
	const selectorOClasses = classNames(style.selectButton, {
		[style.unselected]: selectedMark === X,
	});

	const xTitle = selectedMark === X ? "X is selected" : "Select X";
	const oTitle = selectedMark === O ? "O is selected" : "Select O";

	return (
		<div className={style.markSelector}>
			<div className={style.instructionText}>Pick player 1's mark</div>
			<div className={style.selectorButtons}>
				<button
					type="button"
					className={selectorXClasses}
					onClick={() => onPlayerClick(X)}
					title={xTitle}
				>
					<IconX className={style.icon} />
				</button>
				<button
					type="button"
					className={selectorOClasses}
					onClick={() => onPlayerClick(O)}
					title={oTitle}
				>
					<IconO className={style.icon} />
				</button>
			</div>
			<div className={style.reminderText}>Remember : X goes first</div>
		</div>
	);
};

export default MarkSelector;
