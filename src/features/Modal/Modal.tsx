import style from "./Modal.module.scss";
import { PropsWithChildren } from "react";

const Modal = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div className={style.background} />
			<div className={style.modal}>{children}</div>
		</>
	);
};

export default Modal;
