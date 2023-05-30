import { render, screen } from "@testing-library/react";
import SecondaryOutcomeText from "./SecondaryOutcomeText";

test("shows 'Player 1 wins' message when X wins", () => {
	render(<SecondaryOutcomeText winner={"X"} player1={"X"} isCPU={false} />);
	const linkElement = screen.getByText(/Player 1 wins/i);
	expect(linkElement).toBeInTheDocument();
});

test("shows 'Player 1 wins' message when O wins", () => {
	render(<SecondaryOutcomeText winner={"O"} player1={"O"} isCPU={false} />);
	const linkElement = screen.getByText(/Player 1 wins/i);
	expect(linkElement).toBeInTheDocument();
});

test("shows 'Player 2 wins' message when X wins", () => {
	render(<SecondaryOutcomeText winner={"X"} player1={"O"} isCPU={false} />);
	const linkElement = screen.getByText(/Player 2 wins/i);
	expect(linkElement).toBeInTheDocument();
});

test("shows 'Player 2 wins' message when O wins", () => {
	render(<SecondaryOutcomeText winner={"O"} player1={"X"} isCPU={false} />);
	const linkElement = screen.getByText(/Player 2 wins/i);
	expect(linkElement).toBeInTheDocument();
});

test("shows 'You won' message when player X wins", () => {
	render(<SecondaryOutcomeText winner={"X"} player1={"X"} isCPU={true} />);
	const linkElement = screen.getByText(/You won!/i);
	expect(linkElement).toBeInTheDocument();
});

test("shows 'You won' message when player O wins", () => {
	render(<SecondaryOutcomeText winner={"O"} player1={"O"} isCPU={true} />);
	const linkElement = screen.getByText(/You won!/i);
	expect(linkElement).toBeInTheDocument();
});

test("shows 'You lost' message when CPU X wins", () => {
	render(<SecondaryOutcomeText winner={"X"} player1={"O"} isCPU={true} />);
	const linkElement = screen.getByText(/Oh no, you lost.../i);
	expect(linkElement).toBeInTheDocument();
});

test("shows 'You lost' message when CPU O wins", () => {
	render(<SecondaryOutcomeText winner={"O"} player1={"X"} isCPU={true} />);
	const linkElement = screen.getByText(/Oh no, you lost.../i);
	expect(linkElement).toBeInTheDocument();
});
