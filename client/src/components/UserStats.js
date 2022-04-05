import React from "react";

export default function UserStats() {
  const data = JSON.parse(localStorage.getItem("quizla-historical-stats"));
  const scores = [
    data.geography,
    data.pop_culture,
    data.history,
    data.arts_and_lit,
    data.science_and_nature,
    data.sports_and_leisure,
  ];
  const highestScore = Math.max(...scores);
  const geographyScore = data.geography > 0 ? data.geography / highestScore : 0;
  const popCultureScore =
    data.pop_culture > 0 ? data.pop_culture / highestScore : 0;
  const historyScore = data.history > 0 ? data.history / highestScore : 0;
  const artsAndLitScore =
    data.arts_and_lit > 0 ? data.arts_and_lit / highestScore : 0;
  const scienceAndNatureScore =
    data.science_and_nature > 0 ? data.science_and_nature / highestScore : 0;
  const sportsAndLeisureScore =
    data.sports_and_leisure > 0 ? data.sports_and_leisure / highestScore : 0;
  return (
    <div className="stats-chart">
      <h2>All-Time Stats</h2>
      <div className="stats-chart__data-wrapper">
        <div className="stats-chart__labels">
          <div className="stats-chart__labels--geography">Geography</div>
          <div className="stats-chart__labels--pop-culture">Pop Culture</div>
          <div className="stats-chart__labels--history">History</div>
          <div className="stats-chart__labels--arts-and-lit">Kitchen Sink</div>
          <div className="stats-chart__labels--science-and-nature">
            Science &amp; Nat
          </div>
          <div className="stats-chart__labels--sports-and-leisure">
            Sports &amp; Leis
          </div>
        </div>
        <div className="stats-chart__graph">
          <div className="stats-chart__graph-category-wrapper">
            <div
              className={
                data.geography > 0
                  ? "stats-chart__graph--geography"
                  : "stats-chart__graph--geography no-results"
              }
              style={{ width: `calc(50% * ${geographyScore})` }}
            ></div>
            <span>{data.geography}</span>
          </div>
          <div className="stats-chart__graph-category-wrapper">
            <div
              className={
                data.pop_culture > 0
                  ? "stats-chart__graph--pop-culture"
                  : "stats-chart__graph--pop-culture no-results"
              }
              style={{ width: `calc(50% * ${popCultureScore})` }}
            ></div>
            <span>{data.pop_culture}</span>
          </div>
          <div className="stats-chart__graph-category-wrapper">
            <div
              className={
                data.history > 0
                  ? "stats-chart__graph--history"
                  : "stats-chart__graph--history no-results"
              }
              style={{ width: `calc(50% * ${historyScore})` }}
            ></div>
            <span>{data.history}</span>
          </div>
          <div className="stats-chart__graph-category-wrapper">
            <div
              className={
                data.arts_and_lit > 0
                  ? "stats-chart__graph--arts-and-lit"
                  : "stats-chart__graph--arts-and-lit no-results"
              }
              style={{ width: `calc(50% * ${artsAndLitScore})` }}
            ></div>
            <span>{data.arts_and_lit}</span>
          </div>
          <div className="stats-chart__graph-category-wrapper">
            <div
              className={
                data.science_and_nature > 0
                  ? "stats-chart__graph--science-and-nature"
                  : "stats-chart__graph--science-and-nature no-results"
              }
              style={{ width: `calc(50% * ${scienceAndNatureScore})` }}
            ></div>
            <span>{data.science_and_nature}</span>
          </div>
          <div className="stats-chart__graph-category-wrapper">
            <div
              className={
                data.sports_and_leisure > 0
                  ? "stats-chart__graph--sports-and-leisure"
                  : "stats-chart__graph--sports-and-leisure no-results"
              }
              style={{ width: `calc(50% * ${sportsAndLeisureScore})` }}
            ></div>
            <span>{data.sports_and_leisure}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
