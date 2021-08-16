import { Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AddArticle from "./components/AddArticle";
import GetArticles from "./components/GetArticles";
import { NavBar } from "./NavBar";


const App = () => {
 
  return (
    <>
    <NavBar/>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/main" component={GetArticles} />
          <Route path="/addarticle" component={AddArticle}/>
        </Switch>
      </div>
    </>
  );
};

export default App;
