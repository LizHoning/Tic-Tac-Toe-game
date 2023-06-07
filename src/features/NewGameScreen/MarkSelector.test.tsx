import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import NewGameScreen from "./NewGameScreen";

describe("MarkSelector", () => {
	test("selects O as player 1's mark when clicked", () => {
		renderWithProviders(<NewGameScreen />);

		// Check that O button is not selected
		const oButton = screen.getByRole("button", {
			description: /Select O/i,
		});
		// Check that X button is currently selected
		expect(
			screen.getByRole("button", {
				description: /X is selected/i,
			})
		).toBeInTheDocument();
		expect(oButton).toBeInTheDocument();

		// Clicking O button will cause it to become selected and
		// X button will be deselected
		fireEvent.click(oButton);

		// Confirm that X button is no longer selected
		expect(
			screen.getByRole("button", {
				description: /Select X/i,
			})
		).toBeInTheDocument();
		// Confirm that O button is now selected
		expect(
			screen.getByRole("button", {
				description: /O is selected/i,
			})
		).toBeInTheDocument();
	});

	test("selects X as player 1's mark when clicked", () => {
		renderWithProviders(<NewGameScreen />);

		// O button is not selected
		const oButton = screen.getByRole("button", {
			description: /Select O/i,
		});
		// X button is currently selected
		const xButton = screen.getByRole("button", {
			description: /X is selected/i,
		});
		expect(xButton).toBeInTheDocument();
		expect(oButton).toBeInTheDocument();

		// Click O button to swap their selected states
		fireEvent.click(oButton);

		// Confirm that X is not selected
		expect(
			screen.getByRole("button", {
				description: /Select X/i,
			})
		).toBeInTheDocument();
		// Confirm that O is now selected
		expect(
			screen.getByRole("button", {
				description: /O is selected/i,
			})
		).toBeInTheDocument();

		// Click X button to select it again
		fireEvent.click(xButton);

		// Confirm that O is no longer selected
		expect(
			screen.getByRole("button", {
				description: /Select O/i,
			})
		).toBeInTheDocument();
		// Confirm that X is selected again
		expect(
			screen.getByRole("button", {
				description: /X is selected/i,
			})
		).toBeInTheDocument();
	});
});
