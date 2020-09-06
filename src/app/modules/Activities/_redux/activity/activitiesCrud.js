import baxios from '../../../../axios-benajme';

export function createActivity(activity) {
    return baxios.post('/activity', { activity });
}

export function uploadCoverPhoto(activity) {
    return baxios.post('/activityImage/cover-photo-upload', { activity });
}

export function createActivityImage(activityImage) {
    return baxios.post('/activityImage/', { activityImage });
}


export function findActivities(queryParams) {
    return baxios.get('activity/filter', { queryParams });
}