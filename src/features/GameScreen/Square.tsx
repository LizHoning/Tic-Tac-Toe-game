import { useAppSelector } from "../../store/hooks";
import UnmarkedSquare from "./UnmarkedSquare";
import MarkedSquare from "./MarkedSquare";

interface SquareProps {
	id: string;
}

const Square = ({ id }: SquareProps) => {
	const squareData = useAppSelector((state) => state.game.squares[id]);
	const title = `${id} square`;

	return (
		<div title={title}>
			{squareData.mark ? (
				<MarkedSquare {...squareData} />
			) : (
				<UnmarkedSquare id={id} />
			)}
		</div>
	);
};

export default Square;
