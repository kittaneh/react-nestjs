import baxios from '../../../axios-benajme';

export function findBookings(queryParams) {
    return baxios.get('booking/', {params:queryParams});
}

export function updateBooking(id,status,note) {
    return baxios.put(`booking/${id}`,{status:status,note:note});
}

export function updateBookings(ids,status,activity){
    return baxios.post(`booking/updateAll`,{ids:ids,status:status,activity:activity})
}