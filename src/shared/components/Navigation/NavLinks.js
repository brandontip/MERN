import {NavLink} from 'react-router-dom';
import './NavLinks.css';
import AuthContext from "../../context/auth-context";
import React, {useContext} from "react";

function NavLinks() {
    const auth = useContext(AuthContext);

    return <ul className={'nav-links'}>
        <li>
            <NavLink to={'/'} exact>ALL USERS</NavLink>
        </li>
        <li>
            {auth.isLoggedIn  && <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>}
        </li>
        <li>
            {auth.isLoggedIn  &&<NavLink to={'/places/new'}>ADD PLACE</NavLink>}
        </li>
        <li>
            {!auth.isLoggedIn  &&<NavLink to={'/auth'}>AUTHENTICATE</NavLink>}
        </li>
        {auth.isLoggedIn  && <li>
            <button onClick={auth.logout}>LOGOUT</button>
        </li>}
    </ul>
}

export default NavLinks;