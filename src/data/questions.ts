import { Question } from "../types/quiz";

export const questions: Question[] = [
  {
    id: "1",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: "2",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    category: "Science",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: "3",
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
    category: "Science",
    difficulty: "medium",
    timeLimit: 45,
  },
  {
    id: "4",
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
    category: "Art",
    difficulty: "medium",
    timeLimit: 45,
  },
  {
    id: "5",
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Fe", "Au", "Cu"],
    correctAnswer: "Au",
    category: "Science",
    difficulty: "hard",
    timeLimit: 60,
  },
];
