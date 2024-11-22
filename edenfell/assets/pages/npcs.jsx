import React from 'react';
import {motion} from 'framer-motion';

export default function NPCs({className, content}) {
    return(
        <motion.div  className={className || 'content'} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} id="npcs">
            <motion.h1>NPCs</motion.h1>
            <motion.p>...Come back later!</motion.p>
        </motion.div>
    );
}