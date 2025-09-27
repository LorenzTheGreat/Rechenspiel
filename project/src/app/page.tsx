"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // Klassenstufe (1-4) für Schwierigkeitsgrad
  const [grade, setGrade] = useState(1);

  function getRandomTask() {
    // Aufgaben je nach Klassenstufe
    let ops;
    let min = 1, max = 20;
    switch (grade) {
      case 1:
        ops = ["+", "-"];
        max = 20;
        break;
      case 2:
        ops = ["+", "-", "×"];
        max = 50;
        break;
      case 3:
        ops = ["+", "-", "×", "÷"];
        max = 100;
        break;
      case 4:
        ops = ["+", "-", "×", "÷"];
        max = 200;
        break;
      default:
        ops = ["+", "-"];
    }
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * (max - min + 1)) + min;
    let b = Math.floor(Math.random() * (max - min + 1)) + min;
    if (op === "-") {
      if (b > a) [a, b] = [b, a];
    }
    if (op === "÷") {
      b = Math.floor(Math.random() * 9) + 2;
      a = b * (Math.floor(Math.random() * 10) + 2);
    }
    return { a, b, op };
  }

  function getSolution({ a, b, op }: { a: number; b: number; op: string }) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return a / b;
      default: return 0;
    }
  }

  const [task, setTask] = useState(getRandomTask());
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  function checkAnswer(e: React.FormEvent) {
    e.preventDefault();
    const correct = Math.abs(Number(answer) - getSolution(task)) < 0.01;
    setFeedback(correct ? "Super! Richtig gelöst!" : "Leider falsch, versuch es nochmal!");
    if (correct) {
      setTimeout(() => {
        setTask(getRandomTask());
        setAnswer("");
        setFeedback(null);
      }, 1200);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900 text-white font-sans">
      <main className="flex flex-col gap-8 items-center w-full max-w-md p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-md">
        {/* Biber-Maskottchen */}
        <Image src="/biber.png" alt="Biber Maskottchen" width={120} height={120} className="mb-2 drop-shadow-lg" />
        <h1 className="text-3xl font-bold mb-2 text-purple-200">Rechenspiel</h1>
        <p className="text-lg mb-4 text-purple-100">Löse die Aufgabe und lerne spielerisch Rechnen!</p>
        {/* Klassenstufe Auswahl */}
        <div className="mb-2 w-full flex flex-col items-center">
          <label htmlFor="grade" className="text-purple-200 font-semibold mb-1">Klassenstufe wählen:</label>
          <select
            id="grade"
            value={grade}
            onChange={e => {
              setGrade(Number(e.target.value));
              setTask(getRandomTask());
              setAnswer("");
              setFeedback(null);
            }}
            className="bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value={1}>1. Klasse</option>
            <option value={2}>2. Klasse</option>
            <option value={3}>3. Klasse</option>
            <option value={4}>4. Klasse</option>
          </select>
        </div>
        <form onSubmit={checkAnswer} className="flex flex-col items-center gap-4 w-full">
          <div className="text-2xl font-semibold text-purple-50 mb-2">
            {task.a} {task.op} {task.b} = ?
          </div>
          <input
            type="number"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            className="w-32 text-center text-xl p-2 rounded-lg border-2 border-purple-400 bg-white text-purple-900 focus:outline-none focus:border-purple-600 transition"
            placeholder="Antwort"
            required
          />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
          >Antwort prüfen</button>
        </form>
        {feedback && (
          <div className={`mt-2 text-lg font-semibold ${feedback.startsWith("Super") ? "text-green-300" : "text-red-300"}`}>{feedback}</div>
        )}
      </main>
      <footer className="mt-8 text-purple-300 text-sm">Mit Biber-Power rechnen lernen!</footer>
    </div>
  );
}