import instance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../actions/auth"; 


const setup = (store) => {
instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'JWT ' + token;  
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const { dispatch } = store;
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
  
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401) {
  
          try {
            const rs = await instance.post("/token/refresh/", {
              refresh: TokenService.getLocalRefreshToken(),
            });
  
            const { access } = rs.data;
            dispatch(refreshToken(access));
            TokenService.updateLocalAccessToken(access);
  
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
  
      return Promise.reject(err);
    }
  );
  
};

export default setup;
  