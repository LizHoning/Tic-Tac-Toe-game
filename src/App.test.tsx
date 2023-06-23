import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./utils/test-utils";
import App from "./App";
import { generateInitialState } from "./store/gameSlice";

describe("App", () => {
	test("starts on the New Game screen", () => {
		renderWithProviders(<App />);

		// This text only appears on the New Game screen
		expect(screen.getByText(/Pick player 1's mark/i)).toBeInTheDocument();
		// The text "turn" only appears on the Game screen
		expect(screen.queryByText(/turn/i)).not.toBeInTheDocument();
	});

	test("starts a two-player game with player 1 as X", () => {
		renderWithProviders(<App />);

		// Click on the "New game (vs player)" button with X selected as player
		// 1's mark
		fireEvent.click(screen.getByRole("button", { name: /vs player/i }));

		// Check that player 1 is X and player 2 is O
		expect(screen.getByText("X (p1)")).toBeInTheDocument();
		expect(screen.getByText("O (p2)")).toBeInTheDocument();
	});

	test("starts a two-player game with player 1 as O", () => {
		renderWithProviders(<App />);

		// Click the O button to select O as player 1's mark
		fireEvent.click(
			screen.getByRole("button", {
				description: /Select O/i,
			})
		);

		// Click on the "New game (vs player)" button with O selected as player
		// 1's mark
		fireEvent.click(screen.getByRole("button", { name: /vs player/i }));

		// Check that player 1 is O and player 2 is X
		expect(screen.getByText("X (p2)")).toBeInTheDocument();
		expect(screen.getByText("O (p1)")).toBeInTheDocument();
	});

	test("starts a game against the CPU with player 1 as X", () => {
		renderWithProviders(<App />);

		// Click on the "New game (vs CPU)" button with X selected as player
		// 1's mark
		fireEvent.click(screen.getByRole("button", { name: /vs CPU/i }));

		expect(screen.getByText("X (you)")).toBeInTheDocument();
		expect(screen.getByText("O (cpu)")).toBeInTheDocument();
	});

	test("starts a game against the CPU with player 1 as O", () => {
		renderWithProviders(<App />);

		// Click the O button to select O as player 1's mark
		fireEvent.click(
			screen.getByRole("button", {
				description: /Select O/i,
			})
		);

		// Click on the "New game (vs CPU)" button with O selected as player
		// 1's mark
		fireEvent.click(screen.getByRole("button", { name: /vs CPU/i }));

		expect(screen.getByText("X (cpu)")).toBeInTheDocument();
		expect(screen.getByText("O (you)")).toBeInTheDocument();
	});

	test("returns to New Game Screen after quitting", () => {
		// Start the test on the Game screen
		const state = generateInitialState();
		state.gameStatus.roundWinner = "X";
		state.gameStarted = true;

		renderWithProviders(<App />, {
			preloadedState: {
				game: state,
			},
		});

		// Confirm that we've started on the Game screen
		expect(screen.getByText(/takes the round/i)).toBeInTheDocument();
		// Initiate move to the New Game screen
		fireEvent.click(screen.getByRole("button", { name: /Quit/i }));
		// Check that we are on the New Game screen
		expect(screen.getByText(/Pick player 1's mark/i)).toBeInTheDocument();
	});
});
