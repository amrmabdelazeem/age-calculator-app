import React from "react";

function Label(props){
    return <label htmlFor={props.name} id={props.id}>{props.name}</label>
}

export default Label;