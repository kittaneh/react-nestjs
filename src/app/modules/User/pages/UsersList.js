/* eslint-disable no-restricted-imports */
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Spinner from '../../../../_metronic/_partials/controls/Spinner/Spinner';
import { UsersTable } from '../partials/UsersTable'
import * as actions from "../_redux/userActions";

export const UsersList = () => {


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

    return (
        <>
            {entities === null ? <Spinner /> :
                <UsersTable
                    entities={entities === null ? [] : entities}
                />}
        </>);
}