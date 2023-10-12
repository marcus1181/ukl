function sumDice(diceArray) {
  return diceArray.reduce((sum, dice) => sum + dice, 0);
}
function countConsecutive(diceArray) {
  let count = 1;
  for (let i = 1; i < diceArray.length; i++) {
    if (diceArray[i] !== diceArray[i - 1] + 1) {
      count = 1;
    } else {
      count++;
    }
  }
  return count;
}
function getMaxCount(diceArray) {
  let maxCount = 0;
  for (let i = 0; i < diceArray.length - 1; i++) {
    const count = countConsecutive(diceArray.slice(i));
    maxCount = Math.max(maxCount, count);
  }
  return maxCount;
}

function calculateBonus(maxCount) {
  switch (maxCount) {
    case 5:
      return 60;
    case 4:
      return 30;
    default:
      return 0;
  }
}

function calculateScore(diceArray) {
  const score = sumDice(diceArray) + calculateBonus(getMaxCount(diceArray));
  return score;
}
module.exports = calculateScore;