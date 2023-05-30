import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";

import { markSquare } from "../../store/gameSlice";
import style from "./Square.module.scss";
import IconOutline from "./IconOutline";

interface UnmarkedSquareProps {
	id: string;
}

const UnmarkedSquare = ({ id }: UnmarkedSquareProps) => {
	const [showIcon, updateShowIcon] = useState(false);
	const nodeRef = useRef(null);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(markSquare({ id }));
	};

	return (
		<div
			className={style.unmarkedSquare}
			onClick={handleClick}
			onMouseEnter={() => {
				updateShowIcon(true);
			}}
			onMouseLeave={() => {
				updateShowIcon(false);
			}}
		>
			<CSSTransition
				in={showIcon}
				nodeRef={nodeRef}
				timeout={300}
				classNames={{
					enter: style.enter,
					enterActive: style.enterActive,
					exit: style.exit,
					exitActive: style.exitActive,
				}}
			>
				<div ref={nodeRef}>{showIcon && <IconOutline />}</div>
			</CSSTransition>
		</div>
	);
};

export default UnmarkedSquare;
