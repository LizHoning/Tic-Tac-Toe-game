import "./assets/css/App.scss";
import RoundOverModal from "./components/RoundOverModal/RoundOverModal";

import GameScreen from "./components/GameScreen/GameScreen";

function App() {
	return (
		<div className="App">
			<GameScreen />
			<RoundOverModal />
		</div>
	);
}

export default App;
