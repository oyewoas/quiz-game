# Dynamic Quiz Game

A modern, interactive quiz game built with Next.js, TypeScript, and Tailwind CSS. Test your knowledge across various topics with an engaging user interface and real-time feedback.

## 🎮 Features

- **Dynamic Question Loading**: Questions are loaded from a JSON file (easily extendable to API integration)
- **Interactive Gameplay**: 
  - One question at a time display
  - Multiple choice answers
  - Immediate feedback on answers
  - Timer for each question
- **Score Tracking**: 
  - Real-time score updates
  - Final score display
  - High score leaderboard
- **Responsive Design**: 
  - Works on all device sizes
  - Clean, modern UI with Tailwind CSS
- **Error Handling**: 
  - Graceful handling of missing data
  - Smooth error recovery
  - Type-safe with TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quiz-game.git
cd quiz-game
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Play

1. **Start the Game**: The quiz begins automatically when you load the page.
2. **Answer Questions**: 
   - Read each question carefully
   - Select your answer from the provided options
   - You'll receive immediate feedback on your choice
3. **Timer**: Each question has a time limit - answer before time runs out!
4. **Save Your Score**: 
   - After completing the quiz, enter your name to save your score
   - View your position on the leaderboard
5. **Play Again**: Click "Restart Quiz" to try again and improve your score

## 🛠️ Technical Details

- **Frontend Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Data Storage**: Local Storage for leaderboard
- **Code Quality**: ESLint, TypeScript strict mode

## 📝 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── data/            # Static data (questions)
```

## 🔄 Development Workflow

1. Create a new branch for features:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "feat: your feature description"
```

3. Push to GitHub:
```bash
git push origin feature/your-feature-name
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
