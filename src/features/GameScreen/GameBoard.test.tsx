import { fireEvent, screen, within } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { generateInitialState } from "../../store/gameSlice";
import GameBoard from "./GameBoard";

describe("GameBoard", () => {
	test("shows all expected components", () => {
		renderWithProviders(<GameBoard />);

		expect(screen.getByTitle("top-left square")).toBeInTheDocument();
		expect(screen.getByTitle("top-middle square")).toBeInTheDocument();
		expect(screen.getByTitle("top-right square")).toBeInTheDocument();

		expect(screen.getByTitle("middle-left square")).toBeInTheDocument();
		expect(screen.getByTitle("middle square")).toBeInTheDocument();
		expect(screen.getByTitle("middle-right square")).toBeInTheDocument();

		expect(screen.getByTitle("bottom-left square")).toBeInTheDocument();
		expect(screen.getByTitle("bottom-middle square")).toBeInTheDocument();
		expect(screen.getByTitle("bottom-right square")).toBeInTheDocument();
	});

	test("square shows X icon outline on hover", () => {
		renderWithProviders(<GameBoard />);

		const square = screen.getByTitle("top-left square");
		expect(square).toBeInTheDocument();

		const unmarkedSquare = within(square).getByTitle("Unmarked square");
		fireEvent.mouseOver(unmarkedSquare);
		expect(
			within(unmarkedSquare).getByText("icon-x-outline.svg")
		).toBeInTheDocument();

		fireEvent.mouseLeave(unmarkedSquare);
		expect(
			within(unmarkedSquare).queryByText("icon-x-outline.svg")
		).not.toBeInTheDocument();
	});

	test("square shows O icon outline on hover", () => {
		const state = generateInitialState();
		state.gameStatus.currentPlayer = "O";
		renderWithProviders(<GameBoard />, {
			preloadedState: { game: state },
		});

		const square = screen.getByTitle("top-left square");
		const unmarkedSquare = within(square).getByTitle("Unmarked square");
		fireEvent.mouseOver(unmarkedSquare);
		expect(
			within(unmarkedSquare).getByText("icon-o-outline.svg")
		).toBeInTheDocument();

		fireEvent.mouseLeave(unmarkedSquare);
		expect(
			within(unmarkedSquare).queryByText("icon-o-outline.svg")
		).not.toBeInTheDocument();
	});

	test("marks square with X icon when clicked", () => {
		renderWithProviders(<GameBoard />);

		const square = screen.getByTitle("middle square");
		const unmarkedSquare = within(square).getByTitle("Unmarked square");
		fireEvent.click(unmarkedSquare);

		expect(within(square).getByTitle("X icon")).toBeInTheDocument();
	});

	test("marks square with O icon when clicked", () => {
		const state = generateInitialState();
		state.gameStatus.currentPlayer = "O";
		renderWithProviders(<GameBoard />, {
			preloadedState: { game: state },
		});

		const square = screen.getByTitle("middle square");
		const unmarkedSquare = within(square).getByTitle("Unmarked square");
		fireEvent.click(unmarkedSquare);

		expect(within(square).getByTitle("O icon")).toBeInTheDocument();
	});
});
