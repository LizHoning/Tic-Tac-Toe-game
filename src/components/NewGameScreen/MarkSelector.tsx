import classNames from "classnames";

import style from "./MarkSelector.module.scss";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";
import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { X, O, PlayerMark } from "../common/utils";

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

	return (
		<div className={style.markSelector}>
			<div className={style.instructionText}>Pick player 1's mark</div>
			<div className={style.selectorButtons}>
				<div
					className={selectorXClasses}
					onClick={() => onPlayerClick(X)}
				>
					<IconX className={style.icon} />
				</div>
				<div
					className={selectorOClasses}
					onClick={() => onPlayerClick(O)}
				>
					<IconO className={style.icon} />
				</div>
			</div>
			<div className={style.reminderText}>Remember : X goes first</div>
		</div>
	);
};

export default MarkSelector;
