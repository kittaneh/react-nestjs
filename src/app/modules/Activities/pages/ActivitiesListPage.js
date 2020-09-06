import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import StaticSubHeader from '../../../../_metronic/layout/components/subheader/StaticSubHeader';
import Spinner from '../../../../_metronic/_partials/controls/Spinner/Spinner';
import ActivityList from '../partials/ActivityList';
import * as actions from '../_redux/activity/activitiesActions';

export const Activities = (props) => {

    // Getting curret state of customers list from store (Redux)
    const { currentState } = useSelector(
        (state) => ({ currentState: state.activities }),
        shallowEqual
    );
    // const { totalCount, entities, listLoading } = currentState;
    const { entities } = currentState;

    // Customers Redux state
    const dispatch = useDispatch();
    useEffect(() => {
        // server call by queryParams
        dispatch(actions.fetchActivities());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const clickHandler = () => { props.history.replace('/activities/activity'); }

    return (
        <>

            <StaticSubHeader
                title="Activities"
                newBtn="New Activity"
                newBtnClickHandler={clickHandler}
            />
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    {entities === null ? <Spinner /> :
                        <ActivityList
                            entities={entities === null ? [] : entities}
                        />
                    }
                </div >
            </div >
        </>
    );
};