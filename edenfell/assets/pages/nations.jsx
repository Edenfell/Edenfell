import React from 'react';
import {motion} from 'framer-motion';
import LoremIpsum from './loremIpsum';


export default function Nations({className, content}) {
    return(
        <motion.div  className={className || 'content'} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} id="nations">
            <motion.h1>Nations</motion.h1>
            <LoremIpsum />
        </motion.div>
    );
}