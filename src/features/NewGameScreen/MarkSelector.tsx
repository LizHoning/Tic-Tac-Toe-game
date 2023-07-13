import style from "./MarkSelector.module.scss";
import TransitionWrapper from "../TransitionWrapper";
import { ReactComponent as IconO } from "../../assets/images/icon-o.svg";
import { ReactComponent as IconX } from "../../assets/images/icon-x.svg";
import { X, O, PlayerMark } from "../../utils/values";

import Button from "../Button/Button";

interface MarkSelectorProps {
	selectedMark: PlayerMark;
	onPlayerClick: Function;
}

const timeout = 500;

const iconTransitionProps = {
	timeout,
	transitions: {
		CSSPropertyName: "color",
		enteredValue: "#1f3641",
		exitedValue: "#a8bfc9",
	},
};

const MarkSelector = ({ selectedMark, onPlayerClick }: MarkSelectorProps) => {
	const xSelected = selectedMark === X;
	const oSelected = selectedMark === O;

	const xTitle = xSelected ? "X is selected" : "Select X";
	const oTitle = oSelected ? "O is selected" : "Select O";

	const color = {
		color: "none",
		hover: "rgba(168, 191, 201, 0.05)",
	};

	return (
		<div className={style.markSelector}>
			<div className={style.instructionText}>Pick player 1's mark</div>
			<div className={style.selectorButtons}>
				<Button
					className={style.selectButton}
					color={color}
					onClick={() => onPlayerClick(X)}
					active={!xSelected}
					title={xTitle}
				>
					<TransitionWrapper
						{...iconTransitionProps}
						show={xSelected}
					>
						<IconX className={style.icon} />
					</TransitionWrapper>
				</Button>
				<Button
					className={style.selectButton}
					color={color}
					onClick={() => onPlayerClick(O)}
					active={!oSelected}
					title={oTitle}
				>
					<TransitionWrapper
						{...iconTransitionProps}
						show={oSelected}
					>
						<IconO className={style.icon} />
					</TransitionWrapper>
				</Button>
				<TransitionWrapper
					timeout={timeout}
					transitions={{
						CSSPropertyName: "left",
						enteredValue: "8px",
						exitedValue: "206px",
					}}
					show={xSelected}
				>
					<div className={style.buttonHighlight} />
				</TransitionWrapper>
			</div>
			<div className={style.reminderText}>Remember : X goes first</div>
		</div>
	);
};

export default MarkSelector;
