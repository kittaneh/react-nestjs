import baxios from '../../../axios-benajme';
//import axios from 'axios';


export const findUnMappedSkills = (queryParams)  => {
    //return axios.get(`http://localhost:3000/dev/un-mapped-skills/`,queryParams);
    return baxios.get(`skill/un-mapped-skills/`,queryParams);
}

export const findSkills = (queryParams)  => {
    //return axios.get(`http://localhost:3000/dev/`,queryParams);
    return baxios.get(`skill/`,queryParams);
}

export const addSkills = (queryParams)  => {
    //return axios.post(`http://localhost:3000/dev/`,queryParams);
    return baxios.post(`skill/`,queryParams);
}