import { useAppSelector } from "../../store/hooks";
import UnmarkedSquare from "./UnmarkedSquare";
import MarkedSquare from "./MarkedSquare";

interface SquareProps {
	id: string;
}

const Square = ({ id }: SquareProps) => {
	const squareData = useAppSelector((state) => state.game.squares[id]);

	if (squareData.mark) {
		return <MarkedSquare {...squareData} />;
	}

	return <UnmarkedSquare id={id} />;
};

export default Square;
