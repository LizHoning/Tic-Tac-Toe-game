import style from "./App.module.scss";
import { useAppSelector } from "./store/hooks";
import NewGameScreen from "./features/NewGameScreen/NewGameScreen";
import GameScreen from "./features/GameScreen/GameScreen";
import TransitionWrapper from "./features/TransitionWrapper";

function App() {
	const gameStarted = useAppSelector((state) => state.game.gameStarted);
	const timeout = 1000;

	return (
		<div className={style.app}>
			<TransitionWrapper
				timeout={timeout}
				transitions={{
					CSSPropertyName: "left",
					enteredValue: "0vw",
					exitedValue: "-100vw",
				}}
				show={!gameStarted}
				transitionProps={{
					unmountOnExit: true,
				}}
			>
				<div className={style.container}>
					<NewGameScreen />
				</div>
			</TransitionWrapper>
			<TransitionWrapper
				timeout={timeout}
				transitions={{
					CSSPropertyName: "left",
					enteredValue: "0vw",
					exitedValue: "101vw",
				}}
				show={gameStarted}
				transitionProps={{
					unmountOnExit: true,
				}}
			>
				<div className={style.container}>
					<GameScreen />
				</div>
			</TransitionWrapper>
		</div>
	);
}

export default App;
