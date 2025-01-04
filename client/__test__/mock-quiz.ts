import {
  GetAllQuizType,
  GetQuizType,
  QuizReturnType,
  SubmitQuizReturnType,
} from "@/lib/type";

export const mock_question_1: QuizReturnType = {
  id: "67718a5e3211088baed0aa40",
  problems: [
    {
      text: "Which sentence is grammatically correct?",
      options: [
        "She don't like apples.",
        "She doesn't likes apples.",
        "She doesn't like apples.",
        "She doesn't liked apples.",
      ],
    },
    {
      text: "Which word correctly completes the sentence: 'He _____ to the park yesterday.'",
      options: ["go", "goes", "gone", "went"],
    },
    {
      text: "What does the word 'benevolent' mean?",
      options: [
        "Kind and generous",
        "Angry and resentful",
        "Sad and melancholy",
        "Joyful and cheerful",
      ],
    },
    {
      text: "Choose the correct form of the verb: 'If I _____ you, I would apologize.'",
      options: ["am", "was", "were", "be"],
    },
    {
      text: "Which sentence uses the passive voice?",
      options: [
        "The chef prepared a delicious meal.",
        "The meal was prepared by the chef.",
        "The chef is preparing the meal.",
        "The chef has prepared the meal.",
      ],
    },
    {
      text: "What is the meaning of the idiom 'spill the beans'?",
      options: [
        "Make a mess",
        "Reveal a secret",
        "Get into trouble",
        "Cook a meal",
      ],
    },
    {
      text: "Choose the sentence with the correct word order:",
      options: [
        "Yesterday to the store I went.",
        "I to the store went yesterday.",
        "I went to the store yesterday.",
        "Yesterday went I to the store.",
      ],
    },
    {
      text: "Which sentence contains a conditional clause?",
      options: [
        "She sings beautifully.",
        "If it rains, we will stay inside.",
        "He has a pet cat.",
        "They are playing outside.",
      ],
    },
    {
      text: "Identify the subject of the sentence: 'The quick brown fox jumps over the lazy dog.'",
      options: [
        "The quick brown fox",
        "jumps",
        "over the lazy dog",
        "The lazy dog",
      ],
    },
    {
      text: "Which sentence is in the present perfect tense?",
      options: [
        "She is walking to the park.",
        "She has walked to the park.",
        "She walked to the park.",
        "She will walk to the park.",
      ],
    },
  ],
};

export const mock_question_2: QuizReturnType = {
  id: "67718a5e3211088baed0aa41",
  problems: [
    {
      text: "Let ( M ) be a smooth manifold and ( X, Y in Gamma(TM) ) be two vector fields on ( M ). What is the Lie bracket ( [X, Y] ) of these two vector fields?",
      options: [
        "The Lie bracket is defined as ( [X, Y] = X(Y) - Y(X) ).",
        "The Lie bracket is defined as ( [X, Y] = X(Y) + Y(X) ).",
        "The Lie bracket is defined as ( [X, Y] = X(Y) circ Y(X) ).",
        "The Lie bracket is defined as ( [X, Y] = mathcal{L}_X Y - mathcal{L}_Y X ).",
      ],
    },
    {
      text: "Let ( g ) be a Riemannian metric on a smooth manifold ( M ). Which of the following statements about the covariant derivative ( \nabla ) is true?",
      options: [
        "The covariant derivative ( \nabla_X Y ) of two vector fields ( X, Y ) is always symmetric.",
        "The covariant derivative ( \nabla_X Y ) satisfies the Leibniz rule, i.e., ( \nabla_X (fY) = f \nabla_X Y + (Xf) Y ).",
        "The covariant derivative ( \nabla_X Y ) is always parallel to ( Y ).",
        "The covariant derivative ( \nabla_X Y ) of two vector fields ( X, Y ) is the same as their cross product.",
      ],
    },
  ],
};

export const mock_wrong_question_1: SubmitQuizReturnType = [
  {
    index: 0,
    answer: [1],
    response: [2],
  },
  {
    index: 1,
    answer: [0],
    response: [3],
  },
  {
    index: 2,
    answer: [0],
    response: [1],
  },
  {
    index: 3,
    answer: [0],
    response: [2],
  },
  {
    index: 4,
    answer: [0],
    response: [1],
  },
  {
    index: 5,
    answer: [0],
    response: [2],
  },
  {
    index: 6,
    answer: [0],
    response: [1],
  },
  {
    index: 7,
    answer: [0],
    response: [2],
  },
  {
    index: 8,
    answer: [0],
    response: [1],
  },
  {
    index: 9,
    answer: [0],
    response: [2],
  },
];

export const mock_get_quiz_1: GetQuizType = {
  id: "a1b2c3d4-e5f6-7g8h-9i10-jk11lm12no13",
  name: "Exploring Scientific Wonders",
  category: "Science",
  difficulty: "Medium",
  questions: [
    {
      text: "What is the formula for water?",
      options: ["H2O", "CO2", "O2", "H2SO4"],
      answer: [0, 2, 3],
      response: [1, 2, 3],
    },
    {
      text: "Who discovered gravity?",
      options: ["Einstein", "Newton", "Galileo", "Tesla"],
      answer: [1],
      response: [1],
    },
    {
      text: "What is the closest planet to the sun?",
      options: ["Earth", "Mars", "Mercury", "Venus"],
      answer: [2],
      response: [0],
    },
    {
      text: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      answer: [1],
      response: [3],
    },
    {
      text: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Lysosome"],
      answer: [1],
      response: [1],
    },
  ],
  multipleAnswers: false,
  createdAt: new Date("2022-05-15T14:28:23.382Z"),
  remarks: "Review before the final exam.",
};

export const mock_get_all_quiz_1: GetAllQuizType = [
  {
    id: "4e8d7e47-3e24-49f8-8741-1a5f237a2f7e",
    name: "Introduction to Calculus",
    category: "Math",
    difficulty: "Medium",
    multipleAnswers: true,
    createdAt: new Date("2023-04-15T12:34:56Z"),
  },
  {
    id: "7c6d5a90-64f3-4bfa-bcab-44c3f517cb87",
    name: "World History Basics",
    category: "History",
    difficulty: "Hard",
    multipleAnswers: false,
    createdAt: new Date("2023-03-22T08:12:45Z"),
  },
  {
    id: "2c2c4568-bcd8-4f3e-a983-81d7adcc4936",
    name: "Fundamentals of Physics",
    category: "Science",
    difficulty: "Easy",
    multipleAnswers: true,
    createdAt: new Date("2023-05-10T10:30:15Z"),
  },
  {
    id: "1f21be67-e23c-452b-9a6b-e7cb98b8d4b4",
    name: "Advanced Language Skills",
    category: "Language",
    difficulty: "Medium",
    multipleAnswers: false,
    createdAt: new Date("2023-01-18T15:45:30Z"),
  },
  {
    id: "f07c1b42-0a2e-4e14-b78c-a2e6cd3f5d24",
    name: "Geometry Essentials",
    category: "Math",
    difficulty: "Hard",
    multipleAnswers: true,
    createdAt: new Date("2023-02-14T18:25:00Z"),
  },
];
