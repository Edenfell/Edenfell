import React from 'react';
import {motion} from 'framer-motion';
import {Outlet} from 'react-router-dom';

export async function loader() {
    return null;
}

export default function Server({className, content}) {
    return (
        <motion.div  className={className || 'content'} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} id="server">
            <motion.h1>Server</motion.h1>
            <Outlet/>
        </motion.div>
    );
};