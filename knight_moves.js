const isValidPosition = (position) => {
  const regex = /^[A-H][1-8]$/i;
  return regex.test(position);
};

function getKnightMoves(position) {
  if (!isValidPosition(position)) {
    throw new Error('Invalid position. Please enter a valid position in the format "A1" through "H8".');
  }

  const x = position.charCodeAt(0) - 97;
  const y = parseInt(position[1]) - 1;
  const possibleMoves = [];

  if (x - 2 >= 0 && y - 1 >= 0) possibleMoves.push(String.fromCharCode(x - 2 + 97) + (y - 1 + 1));
  if (x - 2 >= 0 && y + 1 <= 7) possibleMoves.push(String.fromCharCode(x - 2 + 97) + (y + 1 + 1));
  if (x - 1 >= 0 && y - 2 >= 0) possibleMoves.push(String.fromCharCode(x - 1 + 97) + (y - 2 + 1));
  if (x - 1 >= 0 && y + 2 <= 7) possibleMoves.push(String.fromCharCode(x - 1 + 97) + (y + 2 + 1));
  if (x + 1 <= 7 && y - 2 >= 0) possibleMoves.push(String.fromCharCode(x + 1 + 97) + (y - 2 + 1));
  if (x + 1 <= 7 && y + 2 <= 7) possibleMoves.push(String.fromCharCode(x + 1 + 97) + (y + 2 + 1));
  if (x + 2 <= 7 && y - 1 >= 0) possibleMoves.push(String.fromCharCode(x + 2 + 97) + (y - 1 + 1));
  if (x + 2 <= 7 && y + 1 <= 7) possibleMoves.push(String.fromCharCode(x + 2 + 97) + (y + 1 + 1));

  return possibleMoves;
}

// retrieve command line argument
const position = process.argv[2];
const possibleMoves = getKnightMoves(position);
console.log(`Possible moves for position ${position}: ${possibleMoves}`);
