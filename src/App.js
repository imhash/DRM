import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  AppBar
} from "./components";
import {
  Home,
  Services
} from "./pages";

export default function App() {
  return (
    <Router>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <div>
        <AppBar>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Services">
            <Services />
          </Route>
          <Route path="/Inbox">
            <Inbox />
          </Route>
          <Route path="/Starred">
            <Starred />
          </Route>
          <Route path="/Drafts">
            <Drafts />
          </Route>
          <Route path="/SendEmail">
            <SendEmail />
          </Route>
          <Route path="/">
            <Services />
          </Route>
        </Switch>
      </AppBar>
      </div>
    </Router>
  );
}

function Inbox() {
  return <h2>Inbox</h2>;
}

function Starred() {
  return <h2>Starred</h2>;
}

function Drafts() {
  return <h2>Drafts</h2>;
}

function SendEmail() {
  return <h2>SendEmail</h2>;
}