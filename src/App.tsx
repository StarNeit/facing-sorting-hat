import React, { useState } from "react";
import questionsData from "./data/questions.json";
import { House, Question } from "./types";
import Chat from "./components/Chat";
import Input from "./components/Input";
import "./App.css";

const houseColors: Record<House, string> = {
  Gryffindor: "#ae0001",
  Hufflepuff: "#f0c75e",
  Ravenclaw: "#222f5b",
  Slytherin: "#2a623d",
};

function getResult(scores: Record<House, number>): House {
  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as House);
}

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<{ text: string; fromUser?: boolean }[]>([
    { text: "Welcome to the Sorting Hat! Ready to find your house?" }
  ]);
  const [scores, setScores] = useState<Record<House, number>>({
    Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0
  });
  const [quizStarted, setQuizStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const questions: Question[] = questionsData as Question[];

  const handleStart = () => {
    setQuizStarted(true);
    setMessages(msgs => [
      ...msgs,
      { text: questions[0].text }
    ]);
  };

  const handleAnswer = (answerText: string) => {
    const q = questions[step];
    const answer = q.answers.find(a => a.text.toLowerCase() === answerText.toLowerCase());
    setMessages(msgs => [
      ...msgs,
      { text: answerText, fromUser: true }
    ]);
    if (answer) {
      setScores(prev => {
        const newScores = { ...prev };
        for (const [house, pts] of Object.entries(answer.points)) {
          newScores[house as House] += pts || 0;
        }
        return newScores;
      });
      setTimeout(() => {
        if (step + 1 < questions.length) {
          setStep(step + 1);
          setMessages(msgs => [
            ...msgs,
            { text: questions[step + 1].text }
          ]);
        } else {
          setFinished(true);
          const result = getResult({
            ...scores,
            ...Object.fromEntries(
              Object.entries(answer.points).map(([house, pts]) => [
                house,
                (scores as any)[house] + (pts || 0),
              ])
            ),
          });
          setMessages(msgs => [
            ...msgs,
            { text: "All done! The Sorting Hat is thinking..." }
          ]);
          setTimeout(() => {
            setMessages(msgs => [
              ...msgs,
              { text: `You belong in ${result}! 🧙‍♂️`, fromUser: false }
            ]);
          }, 1200);
        }
      }, 800);
    } else {
      setTimeout(() => {
        setMessages(msgs => [
          ...msgs,
          { text: "Please choose one of the provided answers." }
        ]);
      }, 500);
    }
  };

  return (
    <div className="app-bg">
      <div className="chat-container">
        <div className="chat-header">Sorting Hat Quiz</div>
        <Chat messages={messages} />
        <div className="chat-footer">
          {!quizStarted && (
            <button
              className="start-btn"
              onClick={handleStart}
            >
              Start Quiz
            </button>
          )}
          {quizStarted && !finished && (
            <div>
              <div className="answer-hint">
                Choose: {questions[step].answers.map(a => `"${a.text}"`).join(", ")}
              </div>
              <Input
                onSend={handleAnswer}
                disabled={finished}
                placeholder="Type your answer exactly..."
              />
            </div>
          )}
          {finished && (
            <div className="result-block">
              <div
                className="result-house"
                style={{
                  background: houseColors[getResult(scores)],
                  color: getResult(scores) === "Hufflepuff" ? "#222" : "#fff"
                }}
              >
                {getResult(scores)}
              </div>
              <div className="try-again">Refresh to try again!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;