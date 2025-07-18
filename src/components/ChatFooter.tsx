import React from "react";
import Input from "./Input";
import { House, Question } from "../types";

interface ChatFooterProps {
  quizStarted: boolean;
  finished: boolean;
  name: string | null;
  questions: Question[];
  step: number;
  onStart: () => void;
  onAnswer: (answer: string) => void;
  scores: Record<House, number>;
  houseColors: Record<House, string>;
  getResult: (scores: Record<House, number>) => House;
}

const StartButton: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <button className="start-btn" onClick={onStart}>
    Start Quiz
  </button>
);

const AnswerHint: React.FC<{ name: string | null; question: Question }> = ({ name, question }) => (
  <div className="answer-hint">
    {name && `Choose: ${question.answers.map(a => `"${a.text}"`).join(", ")}`}
  </div>
);

const ResultBlock: React.FC<{ scores: Record<House, number>; houseColors: Record<House, string>; getResult: (scores: Record<House, number>) => House; }> = ({ scores, houseColors, getResult }) => {
  const house = getResult(scores);
  return (
    <div className="result-block">
      <div
        className="result-house"
        style={{
          background: houseColors[house],
          color: house === "Hufflepuff" ? "#222" : "#fff"
        }}
      >
        {house}
      </div>
      <div className="try-again">Refresh to try again!</div>
    </div>
  );
};

const ChatFooter: React.FC<ChatFooterProps> = ({
  quizStarted,
  finished,
  name,
  questions,
  step,
  onStart,
  onAnswer,
  scores,
  houseColors,
  getResult
}) => (
  <div className="chat-footer">
    {!quizStarted && <StartButton onStart={onStart} />}
    {quizStarted && !finished && (
      <div>
        <AnswerHint name={name} question={questions[step]} />
        <Input
          onSend={onAnswer}
          disabled={finished}
          placeholder="Type your answer exactly..."
        />
      </div>
    )}
    {finished && (
      <ResultBlock scores={scores} houseColors={houseColors} getResult={getResult} />
    )}
  </div>
);

export default ChatFooter; 