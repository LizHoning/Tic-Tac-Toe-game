import { PropsWithChildren } from "react";
import classNames from "classnames";
import style from "./Button.module.scss";

interface ButtonProps {
	className?: string;
	color: "blue" | "yellow" | "silver";
	onClick?: Function;
}

const Button = ({
	children,
	className,
	color,
	onClick,
}: PropsWithChildren<ButtonProps>) => {
	// Creates a className string with the default button style,
	// the selected color styles, and an optional className prop.
	const classes = classNames(style.button, style[color], className);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (onClick) {
			onClick(e);
		}
	};
	return (
		<button type="button" className={classes} onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
