import { useSelector } from "react-redux";

import "./assets/css/App.scss";
import type { RootState } from "./store/store";
import NewGameScreen from "./components/NewGameScreen/NewGameScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import RoundOverModal from "./components/RoundOverModal/RoundOverModal";
import RestartGameModal from "./components/RestartGameModal/RestartGameModal";

function App() {
	const gameStarted = useSelector(
		(state: RootState) => state.game.gameStarted
	);
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
