export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      // if (authToken) {
      //   config.headers.Authorization = `Bearer ${authToken}`;
      // }
      if (authToken && config.url.includes('accounts:lookup')) {
        config.data = { idToken: authToken }
      }

      return config;
    },
    err => Promise.reject(err)
  );
}
