import {React, useState} from 'react';
import {motion, useScroll, useMotionValueEvent} from 'framer-motion';
import Menu from './menu';
import Logo from './logo';
import Emblem from './emblem';
import Dropdown from './dropdown';

export default function Navbar({content, menuIsExpanded, setMenuIsExpanded, portrait, setPortrait}) {
    function toggleMenu() {
        setMenuIsExpanded(!menuIsExpanded);
    }
    // const { scrollY } = useScroll();
    // useMotionValueEvent(scrollY, "change", (latest) => {
    //     if(latest > 300 && scrollY?.prev <= 300) {
    //         setScrolled(true);
    //     } else if(latest <= 300 && scrollY?.prev > 300) {
    //         setScrolled(false);
    //     }
    // });
    return(
        <>
        <motion.nav className='navbar'>
            <motion.div layout className="nav-div">
                <Logo layout setMenuIsExpanded={setMenuIsExpanded}/>
                <Emblem layout portrait={portrait}/>
                <Dropdown layout expandMenu={toggleMenu}/>
            </motion.div>
        </motion.nav>
        <Menu expanded={menuIsExpanded} portrait={portrait} setMenuIsExpanded={setMenuIsExpanded} content={content}/>
        </>
    );
}