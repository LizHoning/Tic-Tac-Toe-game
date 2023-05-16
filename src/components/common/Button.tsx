import style from "./Button.module.scss";
import { PropsWithChildren } from "react";

interface ButtonProps {
	className?: string;
	color: "blue" | "yellow" | "silver";
}

const Button = ({
	children,
	className,
	color,
}: PropsWithChildren<ButtonProps>) => {
	const buttonStyles = `${style.button} ${style[color]}`;
	const classes = className ? `${buttonStyles} ${className} ` : buttonStyles;
	return (
		<button type="button" className={classes}>
			{children}
		</button>
	);
};

export default Button;
