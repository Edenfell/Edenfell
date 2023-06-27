import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';

export default function MapChunk() {
    return(
        <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="380 90 641 385">
         <Link to="../map1Info">
            <motion.path
            d="M426 251 508 200 639 201 712 227 816 132 842 119 848 149 880 142 867 90 956 116 974 137 1021 196 953 286 856 357 773 435 474 475 380 375Z"
            stroke="#000000"
            stroke-width="1"
            fill="#FFFFFF"
            id="path50" />
         </Link>
      </motion.svg>
    );
}