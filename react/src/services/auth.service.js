import api from "./api";
import TokenService from "./token.service";

const register = (user_name, email, password) => {
  return api.post("/auth/register/", {
    user_name,
    email,
    password
  });
};

const login = (email, password) => {
  console.log(email, password)
  return api
    .post("/token/", {
      email,
      password
    })
    .then((response) => {
      if (response.data.access) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
