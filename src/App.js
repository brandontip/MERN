import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Users from "./users/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
function App() {
  return(<Router>
    <MainNavigation />
    <main>
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places" exact>
        <UserPlaces/>
      </Route>
      <Redirect to={'/'} />
    </Switch>
    </main>
  </Router>);
}



export default App;
