import baxios from '../../../axios-benajme';

export function findEvents(queryParams) {
    return baxios.get(`calendar/?organiser=1`);
}