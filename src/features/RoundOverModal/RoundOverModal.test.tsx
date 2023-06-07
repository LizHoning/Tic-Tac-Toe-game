import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import RoundOverModal from "./RoundOverModal";

import { generateInitialState } from "../../store/gameSlice";

describe("RoundOverModal", () => {
	test("shows default state and static text", () => {
		const state = generateInitialState();

		// A winner is required to display the Round Over modal, so use
		// X as the default here
		state.gameStatus.winner = "X";

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		// Player 1 is X by default & X is the winner
		expect(screen.getByText(/Player 1 wins!/i)).toBeInTheDocument();
		// The icon displayed is the icon belonging to the winning player
		expect(screen.getByTitle(/Icon X/i)).toBeInTheDocument();
		expect(screen.getByText(/takes the round/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Quit/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Next round/i })
		).toBeInTheDocument();
	});

	test("shows 'Player 1 wins!' when X is player 1 and winner", () => {
		const state = generateInitialState();
		state.gameStatus.X.player = "p1";
		state.gameStatus.O.player = "p2";
		state.gameStatus.winner = "X";

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		expect(screen.getByText(/Player 1 wins!/i)).toBeInTheDocument();
		expect(screen.getByTitle(/Icon X/i)).toBeInTheDocument();
	});

	test("shows 'Player 1 wins!' when O is player 1 and winner", () => {
		const state = generateInitialState();
		state.gameStatus.X.player = "p2";
		state.gameStatus.O.player = "p1";
		state.gameStatus.winner = "O";

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		expect(screen.getByText(/Player 1 wins!/i)).toBeInTheDocument();
		expect(screen.getByTitle(/Icon O/i)).toBeInTheDocument();
	});

	test("shows 'Player 2 wins!' when X is player 2 and winner", () => {
		const state = generateInitialState();
		state.gameStatus.X.player = "p2";
		state.gameStatus.O.player = "p1";
		state.gameStatus.winner = "X";

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		expect(screen.getByText(/Player 2 wins!/i)).toBeInTheDocument();
		expect(screen.getByTitle(/Icon X/i)).toBeInTheDocument();
	});

	test("shows 'Player 2 wins!' when O is player 2 and winner", () => {
		const state = generateInitialState();
		state.gameStatus.X.player = "p1";
		state.gameStatus.O.player = "p2";
		state.gameStatus.winner = "O";

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		expect(screen.getByText(/Player 2 wins!/i)).toBeInTheDocument();
		expect(screen.getByTitle(/Icon O/i)).toBeInTheDocument();
	});

	test("shows 'You won!' when against CPU and P1 is X and X wins", () => {
		const state = generateInitialState();
		state.gameStatus.X.player = "p1";
		state.gameStatus.O.player = "p2";
		state.gameStatus.winner = "X";
		state.gameStatus.useCPU = true;

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		expect(screen.getByText(/You won!/i)).toBeInTheDocument();
		expect(screen.getByTitle(/Icon X/i)).toBeInTheDocument();
	});

	test("shows 'You won!' when against CPU and P1 is O and O wins", () => {
		const state = generateInitialState();
		state.gameStatus.X.player = "p2";
		state.gameStatus.O.player = "p1";
		state.gameStatus.winner = "O";
		state.gameStatus.useCPU = true;

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		expect(screen.getByText(/You won!/i)).toBeInTheDocument();
		expect(screen.getByTitle(/Icon O/i)).toBeInTheDocument();
	});

	test("shows 'You lost' when against CPU and P1 is X and O wins", () => {
		const state = generateInitialState();
		state.gameStatus.X.player = "p1";
		state.gameStatus.O.player = "p2";
		state.gameStatus.winner = "O";
		state.gameStatus.useCPU = true;

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		expect(screen.getByText(/Oh no, you lost/i)).toBeInTheDocument();
		expect(screen.getByTitle(/Icon O/i)).toBeInTheDocument();
	});

	test("shows 'You lost' when against CPU and P1 is O and X wins", () => {
		const state = generateInitialState();
		state.gameStatus.X.player = "p2";
		state.gameStatus.O.player = "p1";
		state.gameStatus.winner = "X";
		state.gameStatus.useCPU = true;

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		expect(screen.getByText(/Oh no, you lost/i)).toBeInTheDocument();
		expect(screen.getByTitle(/Icon X/i)).toBeInTheDocument();
	});

	test("shows 'Round tied' when tie", () => {
		const state = generateInitialState();
		state.gameStatus.winner = "tie";

		renderWithProviders(<RoundOverModal />, {
			preloadedState: {
				game: state,
			},
		});

		expect(screen.getByText(/Round tied/i)).toBeInTheDocument();

		// The "winner is tie" state is significantly different to the
		// other states so we explicitly confirm that everything is
		// being displayed as expected
		expect(
			screen.getByRole("button", { name: /Quit/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Next round/i })
		).toBeInTheDocument();

		expect(screen.queryByTitle(/Icon O/i)).not.toBeInTheDocument();
		expect(screen.queryByTitle(/Icon X/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/wins!/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/You won/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/You lost/i)).not.toBeInTheDocument();
	});
});
