import React from "react";

export function BInput({
    label,
    type = "text",
    ...props
}) {

    let inputEl = <input
        type={type}
        className="form-control"
        { ...props}
    />

    if(type==='textarea'){
        inputEl = <textarea
        className="form-control"
        { ...props}
    />
    }

    if (props.divClasses) {
        inputEl = <div className={props.divClasses}>{inputEl}</div>
    }

    return (
        <>
            {label && <label className={props.labelClasses}>{label}</label>}
            {inputEl}
        </>
    );
}
