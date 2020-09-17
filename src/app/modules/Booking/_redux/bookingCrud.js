import baxios from '../../../axios-benajme';

export function findBookings(queryParams) {
    return baxios.get('booking/', {params:queryParams});
}

export function updateBooking(id,status) {
    return baxios.put(`booking/${id}`,{status:status});
}

export function updateBookings(ids,status,activity){
    return baxios.post(`booking/updateAll`,{ids:ids,status:status,activity:activity})
}