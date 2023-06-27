import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

export default function LocationContent({locationName}) {
    let location = useOutletContext();
    if(!location[2]) location = location[0];
    if(location.world) location = location.world;
    location = location.filter(page => {
        return page.page == locationName;
    });
    console.log(location);
    return(
        <motion.div>
            {location[0].content.map( (div, index) => {
                return(
                    <motion.div className={`content-div-${div.type}`} key={`content-div-${index}`}> 
                        {div.img && (div.imgType != "right" || portrait)  && <motion.img src={`./${div.img}`} className={`content-img-${div.imgType}`} key={`content-img-${index}`}/>}
                        <motion.div>
                            {div.title && <motion.h1>{div.title}</motion.h1>}
                            {div.paragraphs && div.paragraphs.map(para => {
                                return(
                                    <motion.p>{para}</motion.p>
                                )
                            })}
                        </motion.div>
                    </motion.div>
            )})}
        </motion.div>
    );
}