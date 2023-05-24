import EmptySquare from "./EmptySquare";
import MarkedSquare from "./MarkedSquare";

import { PlayerTypes, MarkTypes } from "../common/utils";

interface SquareProps {
	currentPlayerMark: PlayerTypes;
	mark: MarkTypes;
	isWinningMark: boolean;
}

const Square = ({ currentPlayerMark, mark, isWinningMark }: SquareProps) => {
	if (mark) {
		return <MarkedSquare mark={mark} isWinningMark={isWinningMark} />;
	}

	return <EmptySquare mark={currentPlayerMark} />;
};

export default Square;
