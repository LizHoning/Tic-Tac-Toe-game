import "./assets/css/App.scss";
import { useAppSelector } from "./store/hooks";
import NewGameScreen from "./features/NewGameScreen/NewGameScreen";
import GameScreen from "./features/GameScreen/GameScreen";
import RoundOverModal from "./features/RoundOverModal/RoundOverModal";
import RestartGameModal from "./features/RestartGameModal/RestartGameModal";

function App() {
	const gameStarted = useAppSelector((state) => state.game.gameStarted);
	return (
		<div className="App">
			{gameStarted ? (
				<>
					<GameScreen />
					<RoundOverModal />
					<RestartGameModal />
				</>
			) : (
				<NewGameScreen />
			)}
		</div>
	);
}

export default App;
