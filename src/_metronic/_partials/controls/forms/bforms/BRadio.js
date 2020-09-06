import React from 'react';

export const bRadio = (props) => {
    return (
        <label className="kt-radio">
            <input type="radio" name={props.name}/> {props.label}
            <span></span>
        </label>
    );
}