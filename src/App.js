import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import PostView from "./components/postView";
import NotFoundView from "./components/notFoundView";
import PostDetails from "./components/postDetails";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/post/:id" component={PostDetails} />
          <Route exact path="/" component={PostView} />
          <Route path="*" component={NotFoundView} />
          }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
