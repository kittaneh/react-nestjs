export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      // const {
      //   auth: { userId }
      // } = store.getState();

      // // if (authToken) {
      // //   config.headers.Authorization = `Bearer ${authToken}`;
      // // }
      // if (userId && config.url.includes('buser')) {
      //   // config.data = userId 
      //   config.url = `${config.url}/${userId}`; 
      // }

      return config;
    },
    err => Promise.reject(err)
  );
}
