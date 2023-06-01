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
		expected.squares["00"].mark = "X";
		expected.gameStatus.currentPlayer = "O";

		expect(reducer(previousState, squareMarked({ id: "00" }))).toEqual(
			expected
		);
	});

	test("should mark square O & change currentPlayer to X", () => {
		const previousState = generateInitialState();
		previousState.gameStatus.currentPlayer = "O";

		const expected = generateInitialState();
		expected.squares["00"].mark = "O";
		expected.gameStatus.currentPlayer = "X";

		expect(reducer(previousState, squareMarked({ id: "00" }))).toEqual(
			expected
		);
	});
});

describe("restartGameClicked", () => {
	test("should clear board and hide modal", () => {
		const previousState = generateInitialState();
		previousState.showRestartGameModal = true;
		previousState.squares["01"].mark = "X";
		previousState.squares["10"].mark = "O";
		previousState.squares["21"].mark = "O";
		previousState.squares["21"].isWinningMark = true;

		const expected = generateInitialState();

		expect(reducer(previousState, restartGameClicked())).toEqual(expected);
	});
});

describe("startGameClicked", () => {
	test("should start game with player 1 as X", () => {
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.gameStarted = true;
		expected.gameStatus.X.player = "p1";
		expected.gameStatus.O.player = "p2";
		expected.gameStatus.useCPU = false;

		expect(
			reducer(
				previousState,
				startGameClicked({ player1Mark: "X", opponent: "p2" })
			)
		).toEqual(expected);
	});

	test("should start game with player 1 as O", () => {
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.gameStarted = true;
		expected.gameStatus.X.player = "p2";
		expected.gameStatus.O.player = "p1";
		expected.gameStatus.useCPU = false;

		expect(
			reducer(
				previousState,
				startGameClicked({ player1Mark: "O", opponent: "p2" })
			)
		).toEqual(expected);
	});

	test("should start game with player 1 as X and player 2 as CPU", () => {
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.gameStarted = true;
		expected.gameStatus.X.player = "p1";
		expected.gameStatus.O.player = "p2";
		expected.gameStatus.useCPU = true;

		expect(
			reducer(
				previousState,
				startGameClicked({ player1Mark: "X", opponent: "cpu" })
			)
		).toEqual(expected);
	});
	test("should start game with player 1 as O and and player 2 as CPU", () => {
		const previousState = generateInitialState();

		const expected = generateInitialState();
		expected.gameStarted = true;
		expected.gameStatus.X.player = "p2";
		expected.gameStatus.O.player = "p1";
		expected.gameStatus.useCPU = true;

		expect(
			reducer(
				previousState,
				startGameClicked({ player1Mark: "O", opponent: "cpu" })
			)
		).toEqual(expected);
	});
});
