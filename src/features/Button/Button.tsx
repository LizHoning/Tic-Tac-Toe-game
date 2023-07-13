import { PropsWithChildren, useState } from "react";
import classNames from "classnames";
import style from "./Button.module.scss";
import TransitionWrapper from "../TransitionWrapper";

interface Color {
	color: string;
	hover: string;
}

interface ButtonProps {
	className?: string;
	color: "blue" | "yellow" | "silver" | Color;
	onClick?: Function;
	title?: string;
	active?: boolean;
}

const colorMap = {
	silver: {
		color: "#a8bfc9",
		hover: "#dbe8ed",
	},
	yellow: {
		color: "#f2b137",
		hover: "#ffc860",
	},
	blue: {
		color: "#31c3bd",
		hover: "#65e9e4",
	},
};

const Button = ({
	children,
	className,
	color,
	onClick,
	title,
	active = true,
}: PropsWithChildren<ButtonProps>) => {
	const [isHovering, updateIsHovering] = useState(false);
	// Creates a className string with the default button style,
	// the selected color styles, and an optional className prop.
	const classes = classNames(style.button, className, {
		[style.active]: active,
	});

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (onClick) {
			onClick(e);
		}
	};

	const handleMouseEnter = () => {
		if (active) {
			updateIsHovering(true);
		}
	};

	const handleMouseLeave = () => {
		updateIsHovering(false);
	};

	const colors = typeof color === "string" ? colorMap[color] : color;
	return (
		<TransitionWrapper
			timeout={300}
			show={isHovering}
			transitions={{
				CSSPropertyName: "background",
				enteredValue: colors.hover,
				exitedValue: colors.color,
			}}
		>
			<button
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				type="button"
				className={classes}
				onClick={handleClick}
				title={title}
			>
				{children}
			</button>
		</TransitionWrapper>
	);
};

export default Button;
