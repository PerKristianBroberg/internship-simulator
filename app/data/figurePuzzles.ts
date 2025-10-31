export type FigurePuzzle = {
  id: string;
  grid: string[][];     // 3×3 grid of emojis/shapes
  options: string[];    // multiple choice answers
  correctIndex: number; // fake answer (not used)
  fakeLogic: string;    // fake logical explanation
};

// “Impossible Logic Test” dataset
export const FIGURE_PUZZLES: FigurePuzzle[] = [
  {
    id: "p1",
    grid: [
      ["▲", "■", "●"],
      ["●", "▲", "■"],
      ["■", "?", "▲"],
    ],
    options: ["●", "▲", "■", "⬟", "⬡"],
    correctIndex: 4,
    fakeLogic: "Each shape rotates clockwise every other row, except when preceded by a circle.",
  },
  {
    id: "p2",
    grid: [
      ["⬛", "⬜", "⬛"],
      ["⬜", "⬛", "⬜"],
      ["⬛", "⬜", "?"],
    ],
    options: ["⬛", "⬜", "◼️", "⬢", "⬣"],
    correctIndex: 2,
    fakeLogic: "Contrast alternates diagonally unless mirrored horizontally on even-numbered columns.",
  },
  {
    id: "p3",
    grid: [
      ["🔺", "🔹", "🔸"],
      ["🔸", "🔺", "🔹"],
      ["🔹", "🔸", "?"],
    ],
    options: ["🔺", "🔸", "🔹", "🟣", "⬢"],
    correctIndex: 0,
    fakeLogic: "Shapes follow a non-linear cyclic transformation of hue shifts modulo three.",
  },
  {
    id: "p4",
    grid: [
      ["⚫", "⚪", "⚫"],
      ["⚪", "⚫", "⚪"],
      ["⚫", "⚪", "?"],
    ],
    options: ["⚫", "⚪", "◎", "◉", "⊗"],
    correctIndex: 3,
    fakeLogic: "Black follows white unless adjacent to itself; symmetry may or may not apply.",
  },
  {
    id: "p5",
    grid: [
      ["🔻", "🔺", "🔻"],
      ["🔺", "🔻", "🔺"],
      ["🔻", "🔺", "?"],
    ],
    options: ["🔻", "🔺", "🔸", "🔹", "⬟"],
    correctIndex: 1,
    fakeLogic: "Triangles alternate orientation every third repetition of a rule that doesn’t exist.",
  },
  {
    id: "p6",
    grid: [
      ["🟩", "🟥", "🟦"],
      ["🟥", "🟦", "🟩"],
      ["🟦", "🟩", "?"],
    ],
    options: ["🟥", "🟩", "🟦", "🟨", "⬛"],
    correctIndex: 4,
    fakeLogic: "Color progression follows an inverted primary sequence projected through imaginary axes.",
  },
  {
    id: "p7",
    grid: [
      ["⬢", "⬣", "⬡"],
      ["⬣", "⬡", "⬢"],
      ["⬡", "⬢", "?"],
    ],
    options: ["⬢", "⬣", "⬡", "⬟", "⬢"],
    correctIndex: 0,
    fakeLogic: "Hexagons rotate in the fourth dimension and reappear inconsistently.",
  },
  {
    id: "p8",
    grid: [
      ["◼️", "◻️", "⬛"],
      ["⬛", "◼️", "◻️"],
      ["◻️", "⬛", "?"],
    ],
    options: ["◼️", "◻️", "⬛", "⬢", "⬣"],
    correctIndex: 3,
    fakeLogic: "Each square’s color inverts across both diagonals unless it decides not to.",
  },
  {
    id: "p9",
    grid: [
      ["🟦", "🟧", "🟥"],
      ["🟩", "🟨", "🟪"],
      ["⬛", "⬜", "?"],
    ],
    options: ["🟥", "🟩", "🟨", "⬛", "🟪"],
    correctIndex: 1,
    fakeLogic: "Colors follow a Fibonacci pattern mapped onto a chromatic wheel modulo nonsense.",
  },
  {
    id: "p10",
    grid: [
      ["▲", "▼", "►"],
      ["◄", "▲", "▼"],
      ["►", "?", "◄"],
    ],
    options: ["▲", "▼", "►", "◄", "⬟"],
    correctIndex: 4,
    fakeLogic: "Arrows rotate counterclockwise at inconsistent intervals governed by invisible rules.",
  },
];
