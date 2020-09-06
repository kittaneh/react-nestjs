import * as requestFromServer from "./activitiesCrud";
import { activitiesSlice, callTypes } from "./activitiesSlice";

const { actions } = activitiesSlice;

export const fetchActivities = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .findActivities(queryParams)
        .then(response => {
            const { data } = response;
            dispatch(actions.activitiesFetched({ totalCount: data.length, entities: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't find activities";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};

export const createActivity = activityForCreation => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .createActivity(activityForCreation)
        .then(response => {
            const { coverphoto } = response.data;
            return requestFromServer.uploadCoverPhoto({ coverphoto })
                .then( response => {
                    const {activityImage } = response.data;
                    return dispatch(requestFromServer.createActivityImage({activityImage}))
                    .then( response => {
                        dispatch(actions.activityCreated({ activityImage }));
                    }).catch(error =>{
                        console.log(error);
                    });                
                }).catch(err => {
                    console.log(err);
                });
        })
        .catch(error => {
            console.log(error);
            error.clientMessage = "Can't create activity";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};