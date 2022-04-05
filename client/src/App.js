import "./App.css";
import React from "react";
import StartView from "./components/StartView";
import GameView from "./components/GameView";
import EndView from "./components/EndView";
import Confetti from "react-confetti";
import CookieConsent from "react-cookie-consent";

function App() {
  const [view, setView] = React.useState(null);
  const [gameState, setGameState] = React.useState(
    localStorage.getItem("quizla-game-state")
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(
    localStorage.getItem("quizla-current-question")
  );
  let currentScore = localStorage.getItem("quizla-current-score");
  let allTimeData = JSON.parse(localStorage.getItem("quizla-historical-stats"));
  let statsObject = {
    geography: 0,
    pop_culture: 0,
    history: 0,
    arts_and_lit: 0,
    science_and_nature: 0,
    sports_and_leisure: 0,
  };
  let timerInit = localStorage.getItem("quizla-timer");
  if (!timerInit) {
    timerInit = 15;
  }
  // Initialize localStorage entries if they don't exist
  React.useEffect(() => {
    if (!currentQuestionIndex) {
      localStorage.setItem("quizla-current-question", 0);
    }

    if (!currentScore) {
      localStorage.setItem("quizla-current-score", "0/0");
    }
  }, [currentQuestionIndex, currentScore]);

  // Handle Quiz Data Configuration
  React.useEffect(() => {
    const lastPlayed = localStorage.getItem("quizla-last-played");
    const today = new Date().toLocaleDateString("en-US", {
      timeZone: "Universal",
    });

    if ((!gameState || gameState === "complete") && lastPlayed !== today) {
      localStorage.setItem("quizla-game-state", "start-screen");
      setGameState("start-screen");
      localStorage.setItem("quizla-current-question", 0);
      setView(<StartView handleStart={handleStart} />);
    } else if (
      gameState === "complete" ||
      (!gameState && lastPlayed === today)
    ) {
      setView(<EndView handleState={handleGameState} />);
    } else if (gameState === "in-progress") {
      setView(<GameView handleState={handleGameState} timerInit={timerInit} />);
    } else {
      localStorage.setItem("quizla-current-question", 0);
      setView(<StartView handleStart={handleStart} />);
    }

    // If the user hasn't already played today
    if ((!gameState || gameState === "start-screen") && lastPlayed !== today) {
      // Fetch trivia id
      async function fetchData() {
        // Set the timestamp for the first day
        const originalTimestamp = +new Date("3/29/2022");
        // Get the current date in the universal time zone
        const currentDate = new Date().toLocaleDateString("en-US", {
          timeZone: "Universal",
        });
        // Get the timestamp for today
        const todaysTimestamp = +new Date(currentDate);
        // Calculate the numerical data index to be fetched
        const timestampIndex =
          (todaysTimestamp - originalTimestamp) / 86400000 + 1;
        // Convert data index to string for use in URL
        const id = timestampIndex.toString();

        const url = `/trivia/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const data = await response.json();
        if (!data) {
          window.alert(`Data with index ${id} not found`);
          return;
        }

        if (data.date !== currentDate) {
          window.alert("Error: Requested trivia dates do not match");
        } else {
          // Format trivia data
          let newData = [];
          newData.push(data.questions.geography);
          newData.push(data.questions.pop_culture);
          newData.push(data.questions.history);
          newData.push(data.questions.arts_and_lit);
          newData.push(data.questions.science_and_nature);
          newData.push(data.questions.sports_and_leisure);
          newData[0].category = "geography";
          newData[0].category_nicename = "Geography";
          newData[1].category = "pop_culture";
          newData[1].category_nicename = "Pop Culture";
          newData[2].category = "history";
          newData[2].category_nicename = "History";
          newData[3].category = "arts_and_lit";
          newData[3].category_nicename = "Kitchen Sink";
          newData[4].category = "science_and_nature";
          newData[4].category_nicename = "Science & Nature";
          newData[5].category = "sports_and_leisure";
          newData[5].category_nicename = "Sports & Leisure";

          // Randomize question order
          for (let i = newData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = newData[i];
            newData[i] = newData[j];
            newData[j] = temp;
          }

          // Randomize options order
          newData.forEach((entry) => {
            // Create array for answer options
            let newAnswers = [];
            newAnswers.push(entry.correct);
            entry.incorrect.map((answer) => newAnswers.push(answer));

            // Randomize the answers' order
            for (let i = newAnswers.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = newAnswers[i];
              newAnswers[i] = newAnswers[j];
              newAnswers[j] = temp;
            }
            entry.option1 = newAnswers[0];
            entry.option2 = newAnswers[1];
            entry.option3 = newAnswers[2];
            entry.option4 = newAnswers[3];
            return entry;
          });
          let storedQuizData = localStorage.getItem("quizla-question-data");
          if (!storedQuizData) {
            localStorage.setItem(
              "quizla-question-data",
              JSON.stringify(newData)
            );
          }
        }
      }
      fetchData();
    }

    if (gameState === "complete") {
      const historicalData = JSON.parse(
        localStorage.getItem("quizla-historical-stats")
      );
      let updatedHistoricalData = {};
      updatedHistoricalData.geography =
        parseInt(historicalData.geography) +
        parseInt(localStorage.getItem("quizla-question-geography"));
      updatedHistoricalData.pop_culture =
        parseInt(historicalData.pop_culture) +
        parseInt(localStorage.getItem("quizla-question-pop_culture"));
      updatedHistoricalData.history =
        parseInt(historicalData.history) +
        parseInt(localStorage.getItem("quizla-question-history"));
      updatedHistoricalData.arts_and_lit =
        parseInt(historicalData.arts_and_lit) +
        parseInt(localStorage.getItem("quizla-question-arts_and_lit"));
      updatedHistoricalData.science_and_nature =
        parseInt(historicalData.science_and_nature) +
        parseInt(localStorage.getItem("quizla-question-science_and_nature"));
      updatedHistoricalData.sports_and_leisure =
        parseInt(historicalData.sports_and_leisure) +
        parseInt(localStorage.getItem("quizla-question-sports_and_leisure"));

      localStorage.setItem(
        "quizla-historical-stats",
        JSON.stringify(updatedHistoricalData)
      );
      localStorage.setItem("quizla-question-geography", 0);
      localStorage.setItem("quizla-question-pop_culture", 0);
      localStorage.setItem("quizla-question-history", 0);
      localStorage.setItem("quizla-question-arts_and_lit", 0);
      localStorage.setItem("quizla-question-science_and_nature", 0);
      localStorage.setItem("quizla-question-sports_and_leisure", 0);
      localStorage.setItem("quizla-answered-correctly", 0);
    }
  }, [gameState]);

  // Handle changes to game state
  function handleGameState(value) {
    setGameState(value);
  }

  // Start the game
  function handleStart(value) {
    localStorage.setItem("quizla-answered-correctly", 0);
    localStorage.setItem("quizla-current-score", "0/0");
    localStorage.setItem("quizla-question-geography", 0);
    localStorage.setItem("quizla-question-pop_culture", 0);
    localStorage.setItem("quizla-question-history", 0);
    localStorage.setItem("quizla-question-arts_and_lit", 0);
    localStorage.setItem("quizla-question-science_and_nature", 0);
    localStorage.setItem("quizla-question-sports_and_leisure", 0);
    localStorage.setItem("quizla-current-stats", JSON.stringify(statsObject));
    if (!allTimeData) {
      localStorage.setItem(
        "quizla-historical-stats",
        JSON.stringify(statsObject)
      );
    }
    setGameState(value);
    localStorage.setItem("quizla-timer", 15);
    localStorage.setItem("quizla-game-state", "in-progress");
  }

  return (
    <div className="app">
      {gameState === "complete" && currentScore === "6/6" ? <Confetti /> : ""}
      {view}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        buttonStyle={{
          color: "#ffffff",
          textTransform: "none",
          background: "#000000",
          borderRadius: "40px",
          padding: "10px",
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          background: "#fcd026",
          width: "100%",
          position: "fixed",
          bottom: "0",
          left: "0",
          display: "flex",
          padding: "1rem 0",
          flexWrap: "wrap",
          zIndex: "99",
        }}
        disableStyles={true}
      >
        <span
          style={{
            width: "auto",
            color: "#000000",
            fontWeight: "bold",
            fontSize: "0.875rem",
            padding: "0.5rem 1rem",
            display: "block",
            textAlign: "center",
          }}
        >
          This app uses cookies to enhance the user experience.
        </span>
      </CookieConsent>
    </div>
  );
}

export default App;
