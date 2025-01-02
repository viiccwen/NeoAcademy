import { QuizReturnType } from "@/lib/type";

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