import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';

export default function MapChunk() {
  return(
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="1041 225 296 175">
      <Link to="../map2Info">
        <motion.path d="M1319 253 1253 226 1195 233 1172 263 1138 226 1045 246 1042 320 1102 314 1151 357 1209 397 1222 379 1279 399 1336 312Z" stroke="#000000" stroke-width="1" fill="#FFFFFF"/>
      </Link>
    </motion.svg>
  );
}
