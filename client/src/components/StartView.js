import React from "react";
import UserStats from "./UserStats";

export default function StartView(props) {
  const historicalStats = localStorage.getItem("quizla-historical-stats");
  function handleStart() {
    if (localStorage.getItem("quizla-question-data")) {
      const today = new Date().toLocaleDateString("en-US", {
        timeZone: "Universal",
      });
      localStorage.setItem("quizla-game-state", "in-progress");
      localStorage.setItem("quizla-has-answered", false);
      localStorage.setItem("quizla-option-selected", false);
      localStorage.setItem("quizla-questions-complete", 0);
      localStorage.setItem("quizla-timed-out", false);
      localStorage.setItem("quizla-options-locked", false);
      props.handleStart("in-progress");
      localStorage.setItem("quizla-last-played", today);
    } else {
      alert(
        "There was a problem fetching the quiz data. Maybe try refreshing the page."
      );
    }
  }

  function toggleAbout() {
    const about = document.getElementById("aboutSection");
    if (about.classList.contains("show")) {
      about.classList.remove("show");
    } else {
      about.classList.add("show");
    }
  }

  function toggleStats() {
    const stats = document.getElementById("userStatsSection");
    if (stats.classList.contains("show")) {
      stats.classList.remove("show");
    } else {
      stats.classList.add("show");
    }
  }

  return (
    <div className="app-card start-view">
      <h1 className="app-card__title welcome-title">Quizla!</h1>
      <span className="app-card__subtitle">A daily trivia game</span>
      <div id="aboutSection" className="app-card__about">
        <h2>About Quizla</h2>
        <p>
          Quizla is a daily trivia game which asks you to match a statement to
          one of four options. You'll play six turns, each in a different
          category:&nbsp;<br></br>
          <span style={{ color: "#0e5ead" }}>Geography</span>,{" "}
          <span style={{ color: "#cf13a9" }}>Pop Culture</span>,{" "}
          <span style={{ color: "#9e7700" }}>History</span>,{" "}
          <span style={{ color: "#4d08a6" }}>Arts &amp; Literature</span>,{" "}
          <span style={{ color: "#007524" }}>Science &amp; Nature</span>, or{" "}
          <span style={{ color: "#d15e00" }}>Sports &amp; Leisure</span>.
        </p>
        <p>
          For each category, you'll have fifteen seconds to make your choice and
          click the 'Submit' button.
        </p>
        <p>Quizla questions update every day at midnight UTC.</p>
        <p>
          It's recommended to play Quizla in a modern browser. This app may not
          work correctly in older browsers like Internet Explorer.
        </p>
        <p>Comments? Suggestions? playquizla@gmail.com</p>
        <button className="app-card__about-close-button" onClick={toggleAbout}>
          Close
        </button>
      </div>
      {historicalStats ? (
        <div id="userStatsSection" className="app-card__my-stats">
          <UserStats />
          <button
            className="app-card__my-stats-close-button"
            onClick={toggleStats}
          >
            Close
          </button>
        </div>
      ) : (
        ""
      )}
      {historicalStats ? (
        <button className="app-card__my-stats-button" onClick={toggleStats}>
          My Stats
        </button>
      ) : (
        ""
      )}
      <button className="app-card__about-button" onClick={toggleAbout}>
        About
      </button>
      <button className="app-card__submit-button start" onClick={handleStart}>
        Start
      </button>
    </div>
  );
}
