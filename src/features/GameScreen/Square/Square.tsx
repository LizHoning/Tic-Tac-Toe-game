import TransitionWrapper from "../../TransitionWrapper";
import style from "./Square.module.scss";
import { useAppSelector } from "../../../store/hooks";
import SquareMark from "./SquareMark";
import classNames from "classnames";
import { X, O } from "../../../utils/values";

interface SquareProps {
	id: string;
}

const timeout = 300;

const Square = ({ id }: SquareProps) => {
	const squareData = useAppSelector((state) => state.game.squares[id]);
	const { mark, isWinningMark } = squareData;
	const title = `${id} square`;

	const winningClasses = classNames(style.winningSquareBackground, {
		[style.xWon]: mark === X,
		[style.oWon]: mark === O,
	});

	return (
		<div title={title} className={style.squareContainer}>
			<div className={style.squareBackground} />
			<TransitionWrapper
				show={isWinningMark}
				timeout={timeout}
				transitions={{
					CSSPropertyName: "opacity",
					enteredValue: 1,
					exitedValue: 0,
				}}
				transitionProps={{
					unmountOnExit: true,
				}}
			>
				<div className={winningClasses} />
			</TransitionWrapper>
			<SquareMark
				id={id}
				mark={mark}
				isWinningMark={isWinningMark}
				timeout={timeout}
			/>
		</div>
	);
};

export default Square;
