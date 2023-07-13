import style from "./Modal.module.scss";
import { PropsWithChildren } from "react";
import TransitionWrapper from "../TransitionWrapper";

type Value = string | number;

interface Transitions {
	CSSPropertyName: string;
	enteredValue: Value;
	exitedValue: Value;
	enteringValue?: Value;
	exitingValue?: Value;
}

interface TransitionProps {
	timeout: number;
	transitions: Transitions | Transitions[];
}

interface ModalTransitions {
	background: TransitionProps;
	modal: TransitionProps;
}

interface ModalProps extends PropsWithChildren {
	show: boolean;
	transitions: ModalTransitions;
}

const Modal = ({ children, show, transitions }: ModalProps) => {
	return (
		<>
			<TransitionWrapper
				{...transitions.background}
				transitionProps={{
					unmountOnExit: true,
				}}
				show={show}
			>
				<div className={style.background} />
			</TransitionWrapper>
			<TransitionWrapper
				{...transitions.modal}
				transitionProps={{
					unmountOnExit: true,
				}}
				show={show}
			>
				<div className={style.modal}>{children}</div>
			</TransitionWrapper>
		</>
	);
};

export default Modal;
