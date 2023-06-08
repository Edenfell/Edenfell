import React from 'react';
import {motion} from 'framer-motion';
import LoremIpsum from './loremIpsum';


export default function NPCs() {
    return(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.h1>NPCs</motion.h1>
            <LoremIpsum />
        </motion.div>
    );
}