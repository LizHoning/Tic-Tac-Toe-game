import reducer, {
	squareMarked,
	startGameClicked,
	restartGameModalToggled,
	restartGameClicked,
	generateInitialState,
} from "./gameSlice";

describe("restartGameModalToggled", () => {
	test("should toggle the 'Restart game modal' off", () => {
		const previousState = generateInitialState();
		previousState.showRestartGameModal = true;

		// showRestartGameModal is false by default
		const expected = generateInitialState();

		expect(
			reducer(previousState, restartGameModalToggled({ show: false }))
		).toEqual(expected);
	});

	test("should toggle the 'Restart game modal' on", () => {
		// showRestartGameModal is false by default
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.showRestartGameModal = true;

		expect(
			reducer(previousState, restartGameModalToggled({ show: true }))
		).toEqual(expected);
	});
});

describe("squareMarked", () => {
	test("should mark square X & change currentPlayer to O", () => {
		// CurrentPlayer is X by default
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.squares["top-left"].mark = "X";
		expected.gameStatus.currentPlayerMark = "O";

		expect(
			reducer(previousState, squareMarked({ id: "top-left" }))
		).toEqual(expected);
	});

	test("should mark square O & change currentPlayer to X", () => {
		const previousState = generateInitialState();
		previousState.gameStatus.currentPlayerMark = "O";

		const expected = generateInitialState();
		expected.squares["top-left"].mark = "O";
		expected.gameStatus.currentPlayerMark = "X";

		expect(
			reducer(previousState, squareMarked({ id: "top-left" }))
		).toEqual(expected);
	});
});

describe("restartGameClicked", () => {
	test("should clear board and hide modal", () => {
		const previousState = generateInitialState();
		previousState.showRestartGameModal = true;
		previousState.squares["top-middle"].mark = "X";
		previousState.squares["middle-left"].mark = "O";
		previousState.squares["bottom-middle"].mark = "O";
		previousState.squares["bottom-middle"].isWinningMark = true;
		previousState.gameStatus.currentPlayerMark = "O";

		const expected = generateInitialState();

		expect(reducer(previousState, restartGameClicked())).toEqual(expected);
	});
});

describe("startGameClicked", () => {
	test("should start game with player 1 as X", () => {
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.gameStarted = true;
		expected.gameStatus.player1Mark = "X";
		expected.gameStatus.useCPU = false;

		expect(
			reducer(
				previousState,
				startGameClicked({ player1Mark: "X", useCPU: false })
			)
		).toEqual(expected);
	});

	test("should start game with player 1 as O", () => {
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.gameStarted = true;
		expected.gameStatus.player1Mark = "O";
		expected.gameStatus.useCPU = false;

		expect(
			reducer(
				previousState,
				startGameClicked({ player1Mark: "O", useCPU: false })
			)
		).toEqual(expected);
	});

	test("should start game with player 1 as X and player 2 as CPU", () => {
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.gameStarted = true;
		expected.gameStatus.player1Mark = "X";
		expected.gameStatus.useCPU = true;

		expect(
			reducer(
				previousState,
				startGameClicked({ player1Mark: "X", useCPU: true })
			)
		).toEqual(expected);
	});
	test("should start game with player 1 as O and and player 2 as CPU", () => {
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.gameStarted = true;
		expected.gameStatus.player1Mark = "O";
		expected.gameStatus.useCPU = true;

		expect(
			reducer(
				previousState,
				startGameClicked({ player1Mark: "O", useCPU: true })
			)
		).toEqual(expected);
	});
});
