import api from "./api";


const getArticles = () => {
  return api.get("article/");
};

const deleteArticle = (article_id) => {
  return api.delete(`article/${article_id}`);
};
const addArticle = (user_name, title, email, body) => {
  return api.post("article/", {
    user_name,
    title,
    email,
    body
  });
};

const UserService = {
  getArticles,
  addArticle,
  deleteArticle
};

export default UserService;
