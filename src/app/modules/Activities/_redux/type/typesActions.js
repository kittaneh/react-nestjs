import * as request from "./typesCrud";
import { typesSlice } from "./typesSlice";

const { actions } = typesSlice;

export const fetchTypes = () => dispatch => {
    const typesData = request.findTypes();
    return dispatch(actions.typesLoaded({ entities: typesData }));
};