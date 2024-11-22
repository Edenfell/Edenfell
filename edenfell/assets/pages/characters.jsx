import React from 'react';
import {motion} from 'framer-motion';
import {Outlet, useOutletContext} from 'react-router-dom';

export async function loader() {
    return null;
}

export default function Characters({className}) {
    let context = useOutletContext();
    return (
        <React.Suspense fallback={<h1>Loading...</h1>}>
            <motion.div className={className || 'content'} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} id="characters">
                <motion.h1>Characters</motion.h1>
                <Outlet context={[context[0].characters, context[1]]}/>
            </motion.div>
        </React.Suspense>
    );
};