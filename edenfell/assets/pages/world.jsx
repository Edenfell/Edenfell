import React from 'react';
import {motion} from 'framer-motion';
import {Outlet, useOutletContext} from 'react-router-dom';

export async function loader() {
    return null;
}

export default function World({className}) {
    let content = useOutletContext();
    return (
        <React.Suspense fallback={<h1>Loading...</h1>}>
            <motion.div  className={className || 'content'} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} id="world">
                <motion.h1>World</motion.h1>
                <Outlet context={content.world}/>
            </motion.div>
        </React.Suspense>
    );
};