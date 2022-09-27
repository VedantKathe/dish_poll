import './App.css';
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Dishes from "./components/Dishes";

export const config = {
  endpoint: `https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json`,
};

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/dishes">
          <Dishes />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
