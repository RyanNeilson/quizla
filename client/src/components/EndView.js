import React from "react";
import UserStats from "./UserStats";
import Countdown from "./Countdown";

export default function EndView(props) {
  const score = localStorage.getItem("quizla-current-score");
  const currentStats = JSON.parse(localStorage.getItem("quizla-current-stats"));
  localStorage.removeItem("quizla-question-data");

  function handleClick() {
    let results = document.getElementById("currentStats").innerHTML;
    results = results.replace(/<br>/g, "\n");
    results = results.replace(/&amp;/g, "&");
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(results)
        .then(() => alert("Results Copied"));
    } else {
      alert(
        "Sorry, the results could not be copied. Maybe try again after refreshing the page"
      );
    }
  }

  function toggleResults() {
    const stats = document.getElementById("currentStats");
    const resultsToggle = document.getElementById("resultsToggle");
    if (stats.classList.contains("show")) {
      stats.classList.remove("show");
    } else {
      stats.classList.add("show");
    }

    if (resultsToggle.classList.contains("hide")) {
      resultsToggle.classList.remove("hide");
    } else {
      resultsToggle.classList.add("hide");
    }
  }

  function handleState(value) {
    return props.handleState(value);
  }

  return (
    <div className="app-card end-view">
      <h1 className="app-card__title">
        {score === "6/6" ? "Perfect score! " : "Your score: "} {score}
      </h1>
      <p>
        <button
          id="shareButton"
          className="app-card__share-button"
          onClick={handleClick}
        >
          <span>Share</span>&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="#ffffff"
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
            ></path>
          </svg>
        </button>
      </p>
      <div id="currentStats" className="app-card__current-stats">
        Quizla! Score: {score}
        <br></br>
        Geography: {currentStats.geography === 1 ? "✅" : "❌"}
        <br></br>
        Pop Culture: {currentStats.pop_culture === 1 ? "✅" : "❌"}
        <br></br>
        History: {currentStats.history === 1 ? "✅" : "❌"}
        <br></br>
        Kitchen Sink: {currentStats.arts_and_lit === 1 ? "✅" : "❌"}
        <br></br>
        Science & Nature: {currentStats.science_and_nature === 1 ? "✅" : "❌"}
        <br></br>
        Sports & Leisure: {currentStats.sports_and_leisure === 1 ? "✅" : "❌"}
        <br></br>
        https://quizla.herokuapp.com
        <br></br>
        <br></br>
        <button
          className="app-card__show-results-toggle"
          onClick={toggleResults}
        >
          Close Results
        </button>
      </div>
      <p id="resultsToggle" className="app-card__show-results">
        Share button not copying? To see your results and copy manually,{" "}
        <button
          className="app-card__show-results-toggle"
          onClick={toggleResults}
        >
          click here
        </button>
        .
      </p>
      <p className="app-card__countdown">
        <Countdown handleState={handleState} />
      </p>
      <UserStats />
    </div>
  );
}
