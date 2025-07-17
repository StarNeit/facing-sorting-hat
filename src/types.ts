export type House = "Gryffindor" | "Hufflepuff" | "Ravenclaw" | "Slytherin";

export interface Answer {
  text: string;
  points: Partial<Record<House, number>>;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}