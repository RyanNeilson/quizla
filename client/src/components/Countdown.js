import React from "react";

export default function Countdown(props) {
  const [timeRemaining, setTimeRemaining] = React.useState("");
  const [seconds, setSeconds] = React.useState(1);

  React.useEffect(() => {
    setTimeout(() => {
      const today = new Date();
      const utcYear = today.getUTCFullYear();
      const utcMonth = today.getUTCMonth();
      const utcDay = today.getUTCDate();
      const utcDate = new Date(Date.UTC(utcYear, utcMonth, utcDay));
      let tomorrow = new Date(utcDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowTimestamp = parseInt(tomorrow.valueOf());
      const currentTimestamp = parseInt(Date.parse(new Date()));
      if (tomorrowTimestamp - currentTimestamp > 2000) {
        let secondsRemaining = (tomorrowTimestamp - currentTimestamp) / 1000;
        setTimeRemaining(
          new Date(secondsRemaining * 1000).toISOString().substr(11, 8)
        );
        setSeconds(seconds + 1);
      } else {
        setTimeout(() => {
          localStorage.removeItem("quizla-game-state");
          props.handleState("start-screen");
        }, 3000);
      }
    }, 1000);
  }, [seconds, props]);

  return `Next quiz in: ${timeRemaining}`;
}
