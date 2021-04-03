import React from "react";
import {Link} from "react-router-dom";

const Nav = ({userObj}) =>{
    return(
        <nav className="flex-col-center">
            <ul>
                <li>
                    <Link to="/" className="home-title">Eunitter</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj.displayName ? (
                    userObj.displayName+"님 환영합니다!"
                    ):(
                        "회원님 환영합니다!"
                    )}</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;