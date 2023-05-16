import style from "./Button.module.scss";
import { PropsWithChildren } from "react";
import classNames from "classnames";

interface ButtonProps {
	className?: string;
	color: "blue" | "yellow" | "silver";
}

const Button = ({
	children,
	className,
	color,
}: PropsWithChildren<ButtonProps>) => {
	// Creates a className string with the default button style,
	// the selected color styles, and an optional className prop.
	const classes = classNames(style.button, style[color], className);
	return (
		<button type="button" className={classes}>
			{children}
		</button>
	);
};

export default Button;
