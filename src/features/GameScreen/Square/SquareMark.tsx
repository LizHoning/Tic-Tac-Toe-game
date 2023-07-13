import { useState } from "react";
import classNames from "classnames";

import style from "./SquareMark.module.scss";
import MarkIcon from "./MarkIcon";
import { Mark } from "../../../utils/values";
import TransitionWrapper from "../../TransitionWrapper";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { squareMarked } from "../../../store/gameSlice";

interface SquareMarkProps {
	id: string;
	mark: Mark;
	isWinningMark: boolean;
	timeout: number;
}

const getTransitionWrapperProps = (timeout: number) => {
	return {
		timeout,
		transitions: {
			CSSPropertyName: "opacity",
			enteredValue: 1,
			exitedValue: 0,
		},
		transitionProps: {
			unmountOnExit: true,
		},
	};
};

const SquareMark = ({ id, mark, isWinningMark, timeout }: SquareMarkProps) => {
	const [showIcon, updateShowIcon] = useState(false);
	const dispatch = useAppDispatch();

	const useCPU = useAppSelector((state) => state.game.gameStatus.useCPU);
	const player1Mark = useAppSelector(
		(state) => state.game.gameStatus.player1Mark
	);
	const currentPlayerMark = useAppSelector(
		(state) => state.game.gameStatus.currentPlayerMark
	);

	const isClickable = !mark && (!useCPU || player1Mark === currentPlayerMark);

	const handleClick = () => {
		if (!isClickable) {
			return;
		}
		dispatch(squareMarked({ id }));
	};

	const handleMouseEnter = () => {
		if (isClickable) updateShowIcon(true);
	};

	const handleMouseLeave = () => {
		updateShowIcon(false);
	};

	const transitionWrapperProps = getTransitionWrapperProps(timeout);

	const classes = classNames(style.squareMarkContainer, {
		[style.clickable]: isClickable,
	});

	return (
		<div
			className={classes}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<TransitionWrapper show={showIcon} {...transitionWrapperProps}>
				<div className={style.iconContainer}>
					<MarkIcon isOutline mark={mark || currentPlayerMark} />
				</div>
			</TransitionWrapper>
			<TransitionWrapper
				show={Boolean(mark) && !isWinningMark}
				{...transitionWrapperProps}
			>
				<div className={style.iconContainer}>
					<MarkIcon mark={mark} />
				</div>
			</TransitionWrapper>
			<TransitionWrapper show={isWinningMark} {...transitionWrapperProps}>
				<div className={style.iconContainer}>
					<MarkIcon mark={mark} isWinningMark />
				</div>
			</TransitionWrapper>
		</div>
	);
};

export default SquareMark;
