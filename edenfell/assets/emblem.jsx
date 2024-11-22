import React from 'react';
import emblemBig from "./img/animatedEmblem.gif";
import {motion} from 'framer-motion';

export default function Emblem({portrait}) {
    return (
        <div className="emblem-div">
            <motion.img animate={{opacity:[0, 1]}} transition="easeIn" className='animated-emblem' alt="Emblem" src={emblemBig}/>
        </div>
    );
}