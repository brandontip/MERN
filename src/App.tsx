import React, {useState, useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Users from "./users/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authenticate from "./users/pages/Authenticate";
import AuthContext from "./shared/context/auth-context";

export type FixMeLater = any



function App() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login : FixMeLater = useCallback((uid: React.SetStateAction<null>, token: React.SetStateAction<null>) => {
        setUserId(uid);
        localStorage.setItem('userData', JSON.stringify({userId: uid, token: token}));
        setToken(token);
    },[]);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
    },[]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData')!);
        if(storedData && storedData.token){
            login(storedData.userId, storedData.token);
        }
    }, []);

    let routes;

    if(token){
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
        <AuthContext.Provider value={{isLoggedIn: !!token, token, login, logout, userId }}>
            <Router>
                <MainNavigation/>
                <main>
                    {routes}
                </main>
            </Router>
        </AuthContext.Provider>);
}


export default App;
