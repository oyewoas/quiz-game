import { Question } from "../types/quiz";

export const questions: Question[] = [
  // Blockchain Basics
  {
    id: "blockchain-1",
    question: "What is a blockchain?",
    options: [
      "A distributed ledger technology",
      "A type of cryptocurrency",
      "A database management system",
      "A cloud storage solution",
    ],
    correctAnswer: "A distributed ledger technology",
    category: "blockchain",
    difficulty: "easy",
  },
  {
    id: "blockchain-2",
    question: "What is a block in blockchain?",
    options: [
      "A collection of transactions",
      "A type of cryptocurrency",
      "A mining reward",
      "A network node",
    ],
    correctAnswer: "A collection of transactions",
    category: "blockchain",
    difficulty: "easy",
  },
  {
    id: "blockchain-3",
    question: "What is the purpose of mining in blockchain?",
    options: [
      "To validate transactions and create new blocks",
      "To store cryptocurrency",
      "To hack the network",
      "To create new cryptocurrencies",
    ],
    correctAnswer: "To validate transactions and create new blocks",
    category: "blockchain",
    difficulty: "medium",
  },

  // Web3 & dApps
  {
    id: "web3-1",
    question: "What is Web3?",
    options: [
      "A decentralized version of the internet",
      "A new version of HTML",
      "A cloud computing platform",
      "A social media network",
    ],
    correctAnswer: "A decentralized version of the internet",
    category: "web3",
    difficulty: "easy",
  },
  {
    id: "web3-2",
    question: "What is a dApp?",
    options: [
      "A decentralized application",
      "A digital asset",
      "A database application",
      "A development tool",
    ],
    correctAnswer: "A decentralized application",
    category: "web3",
    difficulty: "easy",
  },
  {
    id: "web3-3",
    question: "Which blockchain is most commonly used for dApps?",
    options: ["Ethereum", "Bitcoin", "Litecoin", "Ripple"],
    correctAnswer: "Ethereum",
    category: "web3",
    difficulty: "medium",
  },

  // DeFi
  {
    id: "defi-1",
    question: "What does DeFi stand for?",
    options: [
      "Decentralized Finance",
      "Digital Finance",
      "Distributed Finance",
      "Direct Finance",
    ],
    correctAnswer: "Decentralized Finance",
    category: "defi",
    difficulty: "easy",
  },
  {
    id: "defi-2",
    question: "What is a yield farm in DeFi?",
    options: [
      "A way to earn rewards by providing liquidity",
      "A type of cryptocurrency",
      "A mining operation",
      "A trading strategy",
    ],
    correctAnswer: "A way to earn rewards by providing liquidity",
    category: "defi",
    difficulty: "medium",
  },
  {
    id: "defi-3",
    question: "What is an AMM in DeFi?",
    options: [
      "Automated Market Maker",
      "Automated Mining Machine",
      "Advanced Market Model",
      "Automated Money Manager",
    ],
    correctAnswer: "Automated Market Maker",
    category: "defi",
    difficulty: "hard",
  },

  // NFTs
  {
    id: "nft-1",
    question: "What does NFT stand for?",
    options: [
      "Non-Fungible Token",
      "New Financial Technology",
      "Network File Transfer",
      "Non-Financial Transaction",
    ],
    correctAnswer: "Non-Fungible Token",
    category: "nft",
    difficulty: "easy",
  },
  {
    id: "nft-2",
    question: "What makes an NFT unique?",
    options: [
      "Its unique digital signature",
      "Its price",
      "Its owner",
      "Its creation date",
    ],
    correctAnswer: "Its unique digital signature",
    category: "nft",
    difficulty: "medium",
  },
  {
    id: "nft-3",
    question: "What is minting in NFTs?",
    options: [
      "The process of creating a new NFT",
      "The process of buying an NFT",
      "The process of selling an NFT",
      "The process of storing an NFT",
    ],
    correctAnswer: "The process of creating a new NFT",
    category: "nft",
    difficulty: "medium",
  },

  // Cryptocurrency
  {
    id: "crypto-1",
    question: "What was the first cryptocurrency?",
    options: ["Bitcoin", "Ethereum", "Litecoin", "Ripple"],
    correctAnswer: "Bitcoin",
    category: "cryptocurrency",
    difficulty: "easy",
  },
  {
    id: "crypto-2",
    question: "What is a private key in cryptocurrency?",
    options: [
      "A secret key used to access and control cryptocurrency",
      "A public address for receiving cryptocurrency",
      "A mining key",
      "A trading key",
    ],
    correctAnswer: "A secret key used to access and control cryptocurrency",
    category: "cryptocurrency",
    difficulty: "medium",
  },
  {
    id: "crypto-3",
    question: "What is a hard fork in cryptocurrency?",
    options: [
      "A permanent divergence in the blockchain",
      "A temporary network issue",
      "A type of cryptocurrency",
      "A mining difficulty adjustment",
    ],
    correctAnswer: "A permanent divergence in the blockchain",
    category: "cryptocurrency",
    difficulty: "hard",
  },
];
