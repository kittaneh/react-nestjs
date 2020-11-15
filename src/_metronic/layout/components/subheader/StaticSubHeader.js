import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const staticSubHeader = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();

    return (
        <div
            id="kt_subheader"
            className={`subheader py-2 py-lg-4 subheader-solid`}
        >
            <div
                className={`container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
            >
                {/* Info */}
                <div className="d-flex align-items-center flex-wrap mr-1">
                    {props.subheaderMobileToggle && (
                        <button
                            className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
                            id="kt_subheader_mobile_toggle"
                        >
                            <span />
                        </button>
                    )}

                    <div className="d-flex align-items-baseline mr-5">
                        <h5 className="text-dark font-weight-bold my-2 mr-5">
                            <>
                                {props.title}
                            </>
                            {/*<small></small>*/}
                        </h5>

                    </div>
                </div>

                {/* Toolbar */}
                {/* <ButtonToolbar> */}
                <div className="d-flex btn-toolbar">
                    {props.newBtn && <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={props.newBtnClickHandler}
                    >
                        {props.newBtn}
                    </Button>}
                    {props.saveBtn && (<Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={props.loading}
                        onClick={!props.loading ? (e) => {
                            // console.log('clicked');
                            // e.preventDefault();
                            props.saveBtnClickHandler();
                        } : null}
                    >
                        {props.loading ? 'Saving…' : props.saveBtn}
                    </Button>)}
                    {props.cancelBtn && <Button
                        className={classes.button}
                        variant="contained"
                        onClick={props.cancelBtnClickHandler}
                    >
                        {props.cancelBtn}
                    </Button>}
                </div>
                {/* </ButtonToolbar> */}
            </div>
        </div>
    );
}

export default staticSubHeader;