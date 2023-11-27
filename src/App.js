import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Users from "./users/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authenticate from "./users/pages/Authenticate";
import AuthContext from "./shared/context/auth-context";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const login = useCallback((uid) => {
        setUserId(uid);
        setIsLoggedIn(true);
    },[]);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
    },[]);

    let routes;

    if(isLoggedIn){
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users/>
                </Route>
                <Route path="/:userId/places" exact>
                    <UserPlaces/>
                </Route>
                <Route path="/places/new" exact>
                    <NewPlace/>
                </Route>
                <Route path="/places/:placeId" exact>
                    <UpdatePlace/>
                </Route>
                <Redirect to={'/'}/>
            </Switch>
        );
    }
    else{
        routes = (
            <Switch>
                <Route path="/auth">
                    <Authenticate/>
                </Route>
                <Route path="/" exact>
                    <Users/>
                </Route>
                <Route path="/:userId/places" exact>
                    <UserPlaces/>
                </Route>

                <Redirect to={'/auth'}/>
            </Switch>
        );
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, userId }}>
            <Router>
                <MainNavigation/>
                <main>
                    {routes}
                </main>
            </Router>
        </AuthContext.Provider>);
}


export default App;
