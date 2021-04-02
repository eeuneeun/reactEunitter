import React from "react";
import {Link} from "react-router-dom";

const Nav = ({userObj}) =>{
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj.displayName} 님 환영합니다</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;