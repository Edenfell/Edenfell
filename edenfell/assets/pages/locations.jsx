import React from 'react';
import {motion} from 'framer-motion';
import { Outlet, useOutletContext } from 'react-router-dom';
import Map from '../map';
import LocationContent from './locationContent';

export default function Locations({className}) {
    let content=useOutletContext()[0];
    return(
        <motion.div  className={className || 'content'} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} id="locations">
            <LocationContent locationName="Locations" />
            <Map />
            <Outlet context={content}/>
        </motion.div>
    );
}