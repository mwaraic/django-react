import './App.css';
import { BrowserRouter as Router, Switch} from "react-router-dom"
import Login from './Login';
import Data from './Data';
import { Route } from 'react-router';
function App() {
 return( <>
  
  <Router>
    <Switch>
       <Route path="/" component={Login} exact />
       <Route path="/data" component={Data} exact/>
    </Switch>
  </Router>
  </>)
}

export default App;
