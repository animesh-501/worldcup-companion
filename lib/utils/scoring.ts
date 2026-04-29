export const SCORING = {
  winnerCorrect: 5,
  exactScore: 10,
  firstScorerCorrect: 5
} as const;

type Prediction = {
  predictedWinnerId?: string | null;
  predictedHomeScore?: number | null;
  predictedAwayScore?: number | null;
  predictedScorer?: string | null;
};

type Result = {
  winnerId: string;
  homeScore: number;
  awayScore: number;
  firstScorer: string;
};

export function calculatePredictionPoints(prediction: Prediction, result: Result) {
  let points = 0;

  if (prediction.predictedWinnerId && prediction.predictedWinnerId === result.winnerId) {
    points += SCORING.winnerCorrect;
  }

  if (
    prediction.predictedHomeScore === result.homeScore &&
    prediction.predictedAwayScore === result.awayScore
  ) {
    points += SCORING.exactScore;
  }

  if (
    prediction.predictedScorer &&
    prediction.predictedScorer.trim().toLowerCase() ===
      result.firstScorer.trim().toLowerCase()
  ) {
    points += SCORING.firstScorerCorrect;
  }

  return points;
}

export const scorePrediction = calculatePredictionPoints;
