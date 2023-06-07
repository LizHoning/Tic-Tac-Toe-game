import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import NewGameScreen from "./NewGameScreen";

describe("NewGameScreen", () => {
	test("shows default state and static text", () => {
		renderWithProviders(<NewGameScreen />);
		// Confirm that all expected components are being displayed
		expect(screen.getByAltText(/XO logo/i)).toBeInTheDocument();
		expect(screen.getByText(/Pick player 1's mark/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { description: /X is selected/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { description: /Select O/i })
		).toBeInTheDocument();
		expect(
			screen.getByText(/Remember : X goes first/i)
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /vs CPU/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /vs player/i })
		).toBeInTheDocument();
	});
});
