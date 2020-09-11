import baxios from '../../../axios-benajme';

export function findBookings(queryParams) {
    return baxios.get('booking/', {params:queryParams});
}