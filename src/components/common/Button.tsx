import style from "./Button.module.scss";
import { PropsWithChildren } from "react";

interface ButtonProps {
	className?: string;
}

const Button = ({ children, className }: PropsWithChildren<ButtonProps>) => {
	const classes = className ? `${style.button} ${className} ` : style.button;
	return (
		<button type="button" className={classes}>
			{children}
		</button>
	);
};

export default Button;
