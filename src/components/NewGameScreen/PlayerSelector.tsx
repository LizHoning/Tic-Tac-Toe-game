import { useState } from "react";
import style from "./PlayerSelector.module.scss";
import classNames from "classnames";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";
import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";

const O = "O";
const X = "X";

const PlayerSelector = () => {
	const [selectedPlayer, updateSelectedPlayer] = useState(O);

	const updatePlayer = (selection: "X" | "O") => {
		updateSelectedPlayer(selection);
	};

	const selectorXClasses = classNames(style.selectButton, {
		[style.unselected]: selectedPlayer === O,
	});
	const selectorOClasses = classNames(style.selectButton, {
		[style.unselected]: selectedPlayer === X,
	});

	return (
		<div className={style.playerSelector}>
			<div className={style.instructionText}>Pick player 1's mark</div>
			<div className={style.selectorButtons}>
				<div
					className={selectorXClasses}
					onClick={() => updatePlayer(X)}
				>
					<IconX className={style.icon} />
				</div>
				<div
					className={selectorOClasses}
					onClick={() => updatePlayer(O)}
				>
					<IconO className={style.icon} />
				</div>
			</div>
			<div className={style.reminderText}>Remember : X goes first</div>
		</div>
	);
};

export default PlayerSelector;
