import { fireEvent, screen, within } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { generateInitialState } from "../../store/gameSlice";
import GameScreen from "./GameScreen";

describe("GameScreen", () => {
	test("shows current player icon at top of screen", () => {
		renderWithProviders(<GameScreen />);

		const currentPlayerDisplay = screen.getByTitle("Current player");
		expect(currentPlayerDisplay).toBeInTheDocument();
		expect(
			within(currentPlayerDisplay).getByText("Turn")
		).toBeInTheDocument();

		// Confirm that the current player icon being displayed is
		// currently X and not O
		expect(
			within(currentPlayerDisplay).getByText("icon-x.svg")
		).toBeInTheDocument();

		expect(
			within(currentPlayerDisplay).queryByText("icon-o.svg")
		).not.toBeInTheDocument();

		// Player X makes their move
		fireEvent.click(
			within(screen.getByTitle("top-right square")).getByTitle(
				"Unmarked square"
			)
		);

		// Confirm that the current player icon is now showing O and not X
		expect(
			within(currentPlayerDisplay).getByText("icon-o.svg")
		).toBeInTheDocument();

		expect(
			within(currentPlayerDisplay).queryByText("icon-x.svg")
		).not.toBeInTheDocument();

		// Player O makes their move
		fireEvent.click(
			within(screen.getByTitle("top-middle square")).getByTitle(
				"Unmarked square"
			)
		);

		// Confirm that the current player icon is again X and not O
		expect(
			within(currentPlayerDisplay).getByText("icon-x.svg")
		).toBeInTheDocument();

		expect(
			within(currentPlayerDisplay).queryByText("icon-o.svg")
		).not.toBeInTheDocument();
	});

	test("shows modal & incremented tie count after tie", () => {
		const state = generateInitialState();
		state.squares["top-left"].mark = "X";
		state.squares["top-middle"].mark = "X";
		state.squares["top-right"].mark = "O";
		state.squares["middle-left"].mark = "O";
		state.squares["middle"].mark = "O";
		state.squares["middle-right"].mark = "X";
		state.squares["bottom-left"].mark = "X";
		state.squares["bottom-middle"].mark = "O";

		renderWithProviders(<GameScreen />, {
			preloadedState: {
				game: state,
			},
		});
		const xCount = screen.getByTitle(/Player X win count/i);
		const tieCount = screen.getByTitle(/Tie count/i);
		const oCount = screen.getByTitle(/Player O win count/i);

		// All counts are initially 0
		expect(xCount.innerHTML).toEqual("0");
		expect(tieCount.innerHTML).toEqual("0");
		expect(oCount.innerHTML).toEqual("0");

		const square = screen.getByTitle("bottom-right square");
		const unmarkedSquare = within(square).getByTitle("Unmarked square");

		// Click the last unmarked square to place a non-winning mark
		fireEvent.click(unmarkedSquare);

		// Round Over modal is showing with the text "Round tied"
		expect(screen.getByText(/Round tied/i)).toBeInTheDocument();

		// Tie count is now 1
		expect(tieCount.innerHTML).toEqual("1");

		// Both player counts are still 0
		expect(xCount.innerHTML).toEqual("0");
		expect(oCount.innerHTML).toEqual("0");
	});

	test("shows modal & incremented X win count after win", () => {
		const state = generateInitialState();
		state.squares["top-left"].mark = "X";
		state.squares["top-middle"].mark = "X";
		state.squares["middle-left"].mark = "O";
		state.squares["middle"].mark = "O";

		renderWithProviders(<GameScreen />, {
			preloadedState: {
				game: state,
			},
		});
		const xCount = screen.getByTitle(/Player X win count/i);
		const tieCount = screen.getByTitle(/Tie count/i);
		const oCount = screen.getByTitle(/Player O win count/i);

		// All counts are initially 0
		expect(xCount.innerHTML).toEqual("0");
		expect(tieCount.innerHTML).toEqual("0");
		expect(oCount.innerHTML).toEqual("0");

		const square = screen.getByTitle("top-right square");
		const unmarkedSquare = within(square).getByTitle("Unmarked square");

		// Win the game by placing an X mark
		fireEvent.click(unmarkedSquare);

		// Round Over modal is showing with the text "Round tied"
		expect(screen.getByText(/Player 1 wins!/i)).toBeInTheDocument();

		// Tie count is now 1
		expect(xCount.innerHTML).toEqual("1");

		// Other player count and tie count are still 0
		expect(tieCount.innerHTML).toEqual("0");
		expect(oCount.innerHTML).toEqual("0");
	});

	test("shows modal & incremented O win count after win", () => {
		const state = generateInitialState();
		state.squares["top-left"].mark = "X";
		state.squares["top-middle"].mark = "X";
		state.squares["bottom-right"].mark = "X";
		state.squares["middle-left"].mark = "O";
		state.squares["middle"].mark = "O";
		state.gameStatus.currentPlayer = "O";

		renderWithProviders(<GameScreen />, {
			preloadedState: {
				game: state,
			},
		});
		const xCount = screen.getByTitle(/Player X win count/i);
		const tieCount = screen.getByTitle(/Tie count/i);
		const oCount = screen.getByTitle(/Player O win count/i);

		// All counts are initially 0
		expect(xCount.innerHTML).toEqual("0");
		expect(tieCount.innerHTML).toEqual("0");
		expect(oCount.innerHTML).toEqual("0");

		const square = screen.getByTitle("middle-right square");
		const unmarkedSquare = within(square).getByTitle("Unmarked square");

		// Win the game by placing an O mark
		fireEvent.click(unmarkedSquare);

		// Round Over modal is showing with the text "Round tied"
		expect(screen.getByText(/Player 2 wins!/i)).toBeInTheDocument();

		// Tie count is now 1
		expect(oCount.innerHTML).toEqual("1");

		// Other player count and tie count are still 0
		expect(tieCount.innerHTML).toEqual("0");
		expect(xCount.innerHTML).toEqual("0");
	});

	test("resets board when 'Next round' in 'RoundOverModal' clicked", () => {
		const state = generateInitialState();
		// Pre-mark some squares
		state.squares["top-left"].mark = "X";
		state.squares["top-middle"].mark = "X";

		renderWithProviders(<GameScreen />, {
			preloadedState: {
				game: state,
			},
		});

		const square = screen.getByTitle("top-right square");
		const unmarkedSquare = within(square).getByTitle("Unmarked square");

		// Mark the third square to win the round
		fireEvent.click(unmarkedSquare);

		// The Round Over modal is shown
		expect(screen.getByText(/Player 1 wins!/i)).toBeInTheDocument();

		// Click the "Next round" button to close the modal and reset the board
		fireEvent.click(screen.getByText("Next round"));

		// Confirm that the modal is closed
		expect(screen.queryByText(/Player 1 wins!/i)).not.toBeInTheDocument();

		// Check that the board has been cleared
		expect(
			within(screen.getByTitle("top-right square")).getByTitle(
				"Unmarked square"
			)
		).toBeInTheDocument();
		expect(
			within(screen.getByTitle("top-middle square")).getByTitle(
				"Unmarked square"
			)
		).toBeInTheDocument();
		expect(
			within(screen.getByTitle("top-left square")).getByTitle(
				"Unmarked square"
			)
		).toBeInTheDocument();
	});
});
