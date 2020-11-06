import * as requestFromServer from "./skillsCrud";
import { skillsSlice, callTypes } from "./skillsSlice";

const { actions } = skillsSlice;

export const fetchUnMappedSkills = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .findUnMappedSkills(queryParams)
        .then(response => {
            const { data } = response;
            dispatch(actions.skillsFetched({ totalCount: data.length, entities: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't find skills";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};

export const addSkills = (ids) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addSkills(ids)
        .then(() => {
            dispatch(actions.skillsAdded({}));
        })
        .catch(error => {
            error.clientMessage = "Can't add skills";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};


