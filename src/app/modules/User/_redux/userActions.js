import * as requestFromServer from "./userCrud";
import { userSlice, callTypes } from "./userSlice";

const { actions } = userSlice;

export const fetchUsers = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .findUsers()
        .then(response => {
            const { data } = response;
            dispatch(actions.usersFetched({ totalCount: data.length, entities: data.users }));
        })
        .catch(error => {
            error.clientMessage = "Can't find users";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};

export const createUser = (user) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .createUser(user)
        .then(response => {
            const user = response.data;
            console.log(user);
            dispatch(actions.userCreated(user));
        })
        .catch(error => {
            console.log(error);
            error.clientMessage = "Can't create user";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};


