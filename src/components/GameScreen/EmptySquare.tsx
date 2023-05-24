import React, { useState, useRef } from "react";
import style from "./Square.module.scss";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as IconXOutline } from "../../assets/images/icon-x-outline.svg";
import { ReactComponent as IconOOutline } from "../../assets/images/icon-o-outline.svg";
import { MarkTypes } from "../common/utils";

interface EmptySquareProps {
	mark: MarkTypes;
}

const iconMap = {
	X: IconXOutline,
	O: IconOOutline,
	"": null,
};

const EmptySquare = ({ mark }: EmptySquareProps) => {
	const [Icon, updateIcon] = useState<React.FC<
		React.SVGProps<SVGSVGElement>
	> | null>(null);
	const nodeRef = useRef(null);

	return (
		<div
			className={style.square}
			onMouseEnter={() => {
				updateIcon(iconMap[mark || ""]);
			}}
			onMouseLeave={() => {
				updateIcon(null);
			}}
		>
			<CSSTransition
				in={Boolean(Icon)}
				nodeRef={nodeRef}
				timeout={300}
				classNames={{
					enter: style.enter,
					enterActive: style.enterActive,
					exit: style.exit,
					exitActive: style.exitActive,
				}}
			>
				<div ref={nodeRef}>
					{Icon && <Icon className={style.icon} />}
				</div>
			</CSSTransition>
		</div>
	);
};

export default EmptySquare;
