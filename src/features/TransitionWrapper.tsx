import { ReactElement } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { useRef, cloneElement } from "react";

type Value = string | number;

interface Transitions {
	CSSPropertyName: string;
	enteredValue: Value;
	exitedValue: Value;
	enteringValue?: Value;
	exitingValue?: Value;
}

interface TransitionWrapperProps {
	timeout: number;
	transitions: Transitions | Transitions[];
	show: boolean;
	transitionProps?: object;
	children: ReactElement<any, any>;
}

interface Style {
	[key: string]: string | number;
}

interface Styles {
	[key: string | TransitionStatus]: Style;
}

interface ReactPropertyMap {
	[key: string]: string;
}

const reactPropertyMap: ReactPropertyMap = {
	"background-color": "backgroundColor",
};

const TransitionWrapper = ({
	timeout,
	transitions,
	show,
	transitionProps = {},
	children,
}: TransitionWrapperProps) => {
	const ref = useRef(null);

	const styles: Styles = {
		entering: {},
		entered: {},
		exiting: {},
		exited: {},
	};

	let transition = ``;

	const transArr = Array.isArray(transitions) ? transitions : [transitions];

	transArr.forEach(
		({
			CSSPropertyName,
			enteringValue,
			enteredValue,
			exitingValue,
			exitedValue,
		}: Transitions) => {
			const reactPropertyName =
				reactPropertyMap[CSSPropertyName] || CSSPropertyName;
			if (transition.length) {
				transition += ", ";
			}
			transition += `${CSSPropertyName} ${timeout}ms`;
			styles.entering[reactPropertyName] = enteringValue || enteredValue;
			styles.entered[reactPropertyName] = enteredValue;
			styles.exiting[reactPropertyName] = exitingValue || exitedValue;
			styles.exited[reactPropertyName] = exitedValue;
		}
	);

	styles.entering.transition = transition;
	styles.exiting.transition = transition;

	return (
		<Transition
			in={show}
			nodeRef={ref}
			timeout={timeout}
			{...transitionProps}
		>
			{(state) => {
				const additionalProps = {
					ref,
					style: styles[state],
				};

				return cloneElement(children, additionalProps);
			}}
		</Transition>
	);
};

export default TransitionWrapper;
