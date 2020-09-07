import axios from "axios";

export const LOGIN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDIHGj5FDLbr2DvEwQy23i9rhkRM72PjVk";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

// export const ME_URL = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDIHGj5FDLbr2DvEwQy23i9rhkRM72PjVk";

export const ME_URL = "https://api.benajme.com/buser/";


export function login(email, password) {
  return axios.post(LOGIN_URL, { email:email, password:password, returnSecureToken: true });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserById() {
  // Authorization head should be fulfilled in interceptor.
  return  axios.get(ME_URL);
}
