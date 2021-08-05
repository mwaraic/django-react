import api from "./api";


const getUserBoard = () => {
  return api.get("/article");
};


const UserService = {
  getUserBoard,
};

export default UserService;
