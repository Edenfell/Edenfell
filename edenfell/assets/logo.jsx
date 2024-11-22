import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as LogoImg} from "./img/Logo.svg";

export default function Logo({setMenuIsExpanded}) {
    function clickedLink() {
        // setTimeout(setMenuIsExpanded, 300, false);
        setMenuIsExpanded(false);
        const element = document.getElementsByClassName('first-content')[0];
        element.scrollIntoView({behavior:"smooth", block:"start", inline:"nearest"});
    }
    return (
        <Link to="/" className="logo-link" onClick={clickedLink}>
            <div className="logo-div">
                {/* <img src={logoImg} className='logo-img' alt=""/> */}
                    <div className='logo-img-div'>
                        <LogoImg className="logo" />
                    </div>
            </div>
        </Link>
    );
}