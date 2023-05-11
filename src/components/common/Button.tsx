import style from "./Button.module.scss";

interface buttonProps {
	text: string;
	className?: string;
}

const Button = ({ text, className }: buttonProps) => {
	const classes = className ? `${style.button} ${className} ` : style.button;
	return (
		<button type="button" className={classes}>
			{text}
		</button>
	);
};

export default Button;
