import { useSelector } from "react-redux";

import "./assets/css/App.scss";
import type { RootState } from "./store/store";
import NewGameScreen from "./features/NewGameScreen/NewGameScreen";
import GameScreen from "./features/GameScreen/GameScreen";
import RoundOverModal from "./features/RoundOverModal/RoundOverModal";
import RestartGameModal from "./features/RestartGameModal/RestartGameModal";

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
