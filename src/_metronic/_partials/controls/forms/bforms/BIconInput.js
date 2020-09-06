import React from 'react';

export const BIconInput = (props) => {
    return (
        <>
            <label className="col-xl-3 col-lg-3 col-form-label">{props.label}</label>
            <div className="col-lg-9 col-xl-6">
                <div className="input-group">
                    <div className="input-group-prepend"><span className="input-group-text"><i className={props.iconClass}></i></span>
                    </div>
                    <input className="form-control" type="text"  />
                    <div className="input-group-append"><span className="input-group-text">NIS</span>
                    </div>
                </div>
            </div>
        </>
        );
}