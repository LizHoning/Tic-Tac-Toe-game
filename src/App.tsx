import "./assets/css/App.scss";
import NewGameScreen from "./components/NewGameScreen/NewGameScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import RoundOverModal from "./components/RoundOverModal/RoundOverModal";

function App() {
	return (
		<div className="App">
			{/* <NewGameScreen /> */}
			<GameScreen />
			<RoundOverModal />
		</div>
	);
}

export default App;
