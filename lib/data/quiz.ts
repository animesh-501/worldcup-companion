export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which country has won the most men's World Cups?",
    options: ["Germany", "Argentina", "Brazil", "Italy"],
    correctIndex: 2
  },
  {
    id: "q2",
    question: "How many teams play in this companion's group stage setup?",
    options: ["24", "28", "32", "48"],
    correctIndex: 2
  },
  {
    id: "q3",
    question: "A perfect score prediction is worth how many points?",
    options: ["5", "10", "15", "20"],
    correctIndex: 1
  },
  {
    id: "q4",
    question: "Which team is represented by the flag 🇯🇵?",
    options: ["South Korea", "Japan", "Saudi Arabia", "Iran"],
    correctIndex: 1
  },
  {
    id: "q5",
    question: "Which role usually takes corner kicks?",
    options: ["Winger", "Center back", "Goalkeeper", "Referee"],
    correctIndex: 0
  },
  {
    id: "q6",
    question: "What does a draw mean?",
    options: ["Both teams scored", "No goals were scored", "Scores are level", "One team forfeited"],
    correctIndex: 2
  },
  {
    id: "q7",
    question: "Which country is in Group G in this app?",
    options: ["Brazil", "Portugal", "Spain", "France"],
    correctIndex: 0
  },
  {
    id: "q8",
    question: "What starts a match?",
    options: ["Throw-in", "Kickoff", "Corner", "Penalty"],
    correctIndex: 1
  },
  {
    id: "q9",
    question: "Which tournament phase comes after groups?",
    options: ["Final", "Knockout rounds", "Qualifying", "Friendly matches"],
    correctIndex: 1
  },
  {
    id: "q10",
    question: "How many options does each quiz question show?",
    options: ["2", "3", "4", "5"],
    correctIndex: 2
  }
];
