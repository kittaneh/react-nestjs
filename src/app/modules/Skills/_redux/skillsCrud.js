import baxios from '../../../axios-benajme';
import axios from 'axios';

export const findUnMappedSkills = (queryParams)  => {
    return axios.get(`http://localhost:3000/dev/un-mapped-skills`,queryParams);
}

export const addSkills = (queryParams)  => {
    return axios.post(`http://localhost:3000/dev/`,queryParams);
}