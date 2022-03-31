import React from 'react';
import Question from './Question';
import Options from './Options';

export default function GameView(props) {
    const [answeredCorrectly, setAnsweredCorrectly] = React.useState(parseInt(localStorage.getItem("quizla-answered-correctly")));
    const [questionIndex, setQuestionIndex] = React.useState(parseInt(localStorage.getItem("quizla-current-question")));
    const [questionsComplete, setQuestionsComplete] = React.useState(parseInt(localStorage.getItem("quizla-questions-complete")));
    const [seconds, setSeconds] = React.useState(props.timerInit);
    const [selected, setSelected] = React.useState(false);
    const [timerStarted, setTimerStarted] = React.useState(false);
    const [timedOut, setTimedOut] = React.useState(JSON.parse(localStorage.getItem("quizla-timed-out")));
    const [warning, setWarning] = React.useState(false);
    const [hasAnswered, setHasAnswered] = React.useState(JSON.parse(localStorage.getItem("quizla-has-answered")));
    const [optionsLocked, setOptionsLocked] = React.useState(JSON.parse(localStorage.getItem("quizla-options-locked")));
    const [buttonText, setButtonText] = React.useState("");
    const quizData = React.useState(JSON.parse(localStorage.getItem("quizla-question-data")));

    // Initialize state and localStorage variables if they don't already exist
    React.useEffect(() => {
        if(!questionIndex) {
            localStorage.setItem("quizla-current-question", 0);
            setQuestionIndex(0);
        } 
        if(!answeredCorrectly) {
            localStorage.setItem("quizla-answered-correctly", 0);
            setAnsweredCorrectly(0);
        }
        if(!questionsComplete) {
            setQuestionsComplete(0);
        }
    }, [questionIndex, answeredCorrectly, questionsComplete]);


    // Start the timer
    React.useEffect(() => {
        setTimerStarted(true)
    }, [questionIndex])


    React.useEffect(() => {
        if(seconds === 0 && !hasAnswered) {
            setTimedOut(true);
            localStorage.setItem("quizla-timed-out", true);
            setOptionsLocked(true);
            localStorage.setItem("quizla-options-locked", true);       
        }
    }, [seconds, hasAnswered])

    // Handle countdown changes
    React.useEffect(() => {
        let interval = null;
        if (timerStarted && seconds > 0) {
          interval = setInterval(() => {
            localStorage.setItem("quizla-timer", seconds - 1);
            setSeconds(seconds => seconds - 1); 
          }, 1000);
        } 
        return () => clearInterval(interval);
    }, [timerStarted, seconds]);

    // Turn off warning text when an option is selected
    React.useEffect(() => {
        setWarning(false);
    }, [selected])

    // Update localStorage every time questionIndex changes
    React.useEffect(() => {
        if(localStorage.getItem("quizla-game-state") === "in-progress") {
            localStorage.setItem("quizla-current-question", questionIndex);
        }
    }, [questionIndex])

    // Handle updates to buttonText
    React.useEffect(() => {
        if(questionsComplete === 6) {
            setButtonText("Finish");
        } else if ( (!hasAnswered) && seconds > 0) {
            setButtonText("Submit");
        } else {
            setButtonText("Next Question")
        }
    }, [questionsComplete, seconds, hasAnswered])

    
    React.useEffect(() => {
        localStorage.setItem("quizla-current-score", answeredCorrectly + "/" + questionsComplete);
    }, [questionsComplete, answeredCorrectly]);

    // 
    React.useEffect(() => {
        localStorage.setItem("quizla-answered-correctly", answeredCorrectly);
    }, [answeredCorrectly]);


    // Handle button interactions
    function handleButton(){ 
        const hasSelected = JSON.parse(localStorage.getItem("quizla-option-selected"));
        // Confirm answer was submitted, prevent other updates
        if(!selected && seconds > 0 && timedOut === false && hasSelected === false) {
            // Tell user to select an option before submission
            setWarning(() => true);
        } else if(selected && !hasAnswered && !timedOut) {
            // Handle valid submission
            setHasAnswered(() => true);
            localStorage.setItem("quizla-has-answered", true);
            localStorage.setItem("quizla-questions-complete", parseInt(questionsComplete + 1));
            setQuestionsComplete(prevValue => parseInt(prevValue + 1));
            if(selected === quizData[0][questionIndex].correct) {
                localStorage.setItem(`quizla-question-${quizData[0][questionIndex].category}`, 1)
                setAnsweredCorrectly(prevValue => parseInt(prevValue + 1));
            }
        } else {
            // Reset state values and move to next question
            if(timedOut === true && optionsLocked === true && buttonText === "Next Question") {
                localStorage.setItem("quizla-questions-complete", parseInt(questionsComplete + 1));
                setQuestionsComplete(prevValue => parseInt(prevValue + 1));
            }
            setWarning(() => false);
            setSelected(() => false);
            setHasAnswered(() => false);
            setTimedOut(() => false);
            localStorage.setItem("quizla-timed-out", false);
            if(questionIndex < 5 && buttonText === "Next Question") {
                localStorage.setItem("quizla-has-answered", false);
                localStorage.setItem("quizla-option-selected", false);
                localStorage.setItem("quizla-options-locked", false);
                setOptionsLocked(false);
                setQuestionIndex(prevIndex => prevIndex + 1)
                localStorage.setItem("quizla-timer", 15);
                setSeconds(15);
            } else {
                const currentStats = {
                    geography: parseInt(localStorage.getItem("quizla-question-geography")),
                    pop_culture: parseInt(localStorage.getItem("quizla-question-pop_culture")),
                    history: parseInt(localStorage.getItem("quizla-question-history")),
                    arts_and_lit: parseInt(localStorage.getItem("quizla-question-arts_and_lit")),
                    science_and_nature: parseInt(localStorage.getItem("quizla-question-science_and_nature")),
                    sports_and_leisure: parseInt(localStorage.getItem("quizla-question-sports_and_leisure"))
                }
                localStorage.setItem("quizla-current-stats", JSON.stringify(currentStats));
                localStorage.setItem("quizla-current-question", "done");
                localStorage.setItem("quizla-game-state", "complete");
                props.handleState("complete");
            }
        }
    }

    return(
        <div className="app-card">
            <div className="app-card__category-header" category={quizData[0][questionIndex].category}>
                    <div className="app-card__category-title">{quizData[0][questionIndex].category_nicename}</div>
            </div>
            <div className="app-card__score-and-timer">
                <div className="app-card__score">Score: {answeredCorrectly}/{questionsComplete}</div>
                { hasAnswered ? '' : <div className="app-card__timer">{seconds > 0 ? "Time left: " : "Time's up!"}{seconds > 0 ? seconds > 0 && seconds < 6 ? <span className="seconds-counter critical">{`${seconds} seconds`}</span> : <span className="seconds-counter">{`${seconds} seconds`}</span> : ""}</div> } 
            </div>
                <Question question={quizData[0][questionIndex].question}/>
                <Options correct={quizData[0][questionIndex].correct} option1={quizData[0][questionIndex].option1} option2={quizData[0][questionIndex].option2} option3={quizData[0][questionIndex].option3} option4={quizData[0][questionIndex].option4} isSelected={selected} answerSubmitted={hasAnswered} seconds={seconds} timedOut={timedOut} selectedAnswer={setSelected}/>
            <div className="app-card__message-warning-wrapper">
                <span className={warning ? "app-card__message-warning show" : "app-card__message-warning"}>You must select an option!</span>
            </div>
            <button className="app-card__submit-button" onClick={handleButton}>{buttonText}</button>
        </div>
    )
}