import React from 'react';

export default function Question(props) {
    return(
    <div className="quiz-question" dangerouslySetInnerHTML={{__html: props.question}}/> 
    )
}