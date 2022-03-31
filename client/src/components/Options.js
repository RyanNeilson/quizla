import React from 'react';

export default function Options(props){
    function handleClick(value) {
        if(!props.answerSubmitted && props.seconds > 0) {
            props.selectedAnswer(value);
            localStorage.setItem("quizla-option-selected", true) 
        }
    }
    return (
       <div className="quiz-options">
           <div optionvalue={props.option1} selectedoption={props.isSelected === props.option1 && !props.timedOut ? "selected" : ""} onClick={() => handleClick(props.option1)} className={props.answerSubmitted ||  props.seconds === 0 ? `quiz-option disabled ${props.correct === props.option1 ? 'correct' : 'incorrect'}` : "quiz-option"} dangerouslySetInnerHTML={{__html: props.option1}}/>
           <div optionvalue={props.option2} selectedoption={props.isSelected === props.option2 && !props.timedOut ? "selected" : ""} onClick={() => handleClick(props.option2)} className={props.answerSubmitted ||  props.seconds === 0 ? `quiz-option disabled ${props.correct === props.option2 ? 'correct' : 'incorrect'}` : "quiz-option"} dangerouslySetInnerHTML={{__html: props.option2}}/>
           <div optionvalue={props.option3} selectedoption={props.isSelected === props.option3 && !props.timedOut ? "selected" : ""} onClick={() => handleClick(props.option3)} className={props.answerSubmitted ||  props.seconds === 0 ? `quiz-option disabled ${props.correct === props.option3 ? 'correct' : 'incorrect'}` : "quiz-option"} dangerouslySetInnerHTML={{__html: props.option3}}/>
           <div optionvalue={props.option4} selectedoption={props.isSelected === props.option4 && !props.timedOut ? "selected" : ""} onClick={() => handleClick(props.option4)} className={props.answerSubmitted ||  props.seconds === 0 ? `quiz-option disabled ${props.correct === props.option4 ? 'correct' : 'incorrect'}` : "quiz-option"} dangerouslySetInnerHTML={{__html: props.option4}}/>
       </div> 
    )
}