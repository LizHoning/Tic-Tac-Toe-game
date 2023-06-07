import "./assets/css/App.scss";
import { useAppSelector } from "./store/hooks";
import NewGameScreen from "./features/NewGameScreen/NewGameScreen";
import GameScreen from "./features/GameScreen/GameScreen";

function App() {
	const gameStarted = useAppSelector((state) => state.game.gameStarted);
	return (
		<div className="App">
			{gameStarted ? <GameScreen /> : <NewGameScreen />}
		</div>
	);
}

export default App;
