/* eslint-disable no-restricted-imports */
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import StaticSubHeader from '../../../../_metronic/layout/components/subheader/StaticSubHeader';
import Spinner from '../../../../_metronic/_partials/controls/Spinner/Spinner';
import { UsersTable } from '../partials/UsersTable'
import * as actions from "../_redux/userActions";

export const UsersListPage = (props) => {

    const history = useHistory();
    const { currentState } = useSelector(
        (state) => ({ currentState: state.user }),
        shallowEqual
    );
    const { entities } = currentState;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchUsers({}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const clickHandler = () => { history.replace('/user'); }

    console.log(props.history);

    return (
        <>
          <StaticSubHeader
                title="Users List"
                newBtn="New User"
                newBtnClickHandler={clickHandler}
            />
            {entities === null ? <Spinner /> :
                <UsersTable
                    entities={entities === null ? [] : entities}
                />}
        </>);
}