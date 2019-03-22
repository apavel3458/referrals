import axios from 'axios'
import config from '@/config/config'
import store from '@/store/store'
import router from '@/router/'

export default () => {
  const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })

  //Add interceptor to forward logout
  instance.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
      if(error.response.status === 403) { 
        router.push(
          { 
            name: 'login', 
            //query: { error: 'You must log in to access this resource' },
            params: { error: "You must log in to access this page" }
          }
        )
        return Promise.reject({error: "Not Authenticated"}) //deal with error
      } else if (error.response.status === 500 || error.response.status === 404) {
        alert("The server encountered an error processing your request. Error Status: " + error.response.status + " | " + error.response.error)
      } else if (error.response.status === 401) {
        return Promise.resolve(error.response);
      }
      // Trow errr again (may be need for some other catch)
      return Promise.reject(error);
  });
  return instance
}
