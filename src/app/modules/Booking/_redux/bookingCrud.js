import baxios from '../../../axios-benajme';

export function findBookings(queryParams) {
    return baxios.get('booking/', {params:queryParams});
}

export function updateBooking(id,status) {
    return baxios.put(`booking/${id}`,{status:status});
}