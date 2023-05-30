import { useSelector } from "react-redux";

import type { RootState } from "../../store/store";
import UnmarkedSquare from "./UnmarkedSquare";
import MarkedSquare from "./MarkedSquare";

interface SquareProps {
	id: string;
}

const Square = ({ id }: SquareProps) => {
	const squareData = useSelector(
		(state: RootState) => state.game.squares[id]
	);

	if (squareData.mark) {
		return <MarkedSquare {...squareData} />;
	}

	return <UnmarkedSquare id={id} />;
};

export default Square;
