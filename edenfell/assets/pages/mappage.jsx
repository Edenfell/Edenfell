import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { useLoaderData, useOutletContext} from 'react-router-dom';

export async function loader({params}) {
    console.log(params);
    return import(`../img/${params.land}.jsx`);
}

export default function MapPage({className}) {
    let Land = useLoaderData();
    let content = useOutletContext();
    Land = Land.default;
    if(!Land) return(<h1>Loading...</h1>);
    return(
        <motion.div className={className}>
            <Land></Land>
        </motion.div>
    );
}