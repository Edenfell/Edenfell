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
                        {(div.title && div.type=="column") && ((!div.paragraphs && <motion.h1 key={`title-${index}`}>{div.title}</motion.h1>) || (div.paragraphs && <motion.h2 key={`title-${index}`}>{div.title}</motion.h2>))} 
                        {div.img && (div.imgType != "right" || portrait)  && <motion.img src={`./${div.img}`} className={`content-img-${div.imgType}`} key={`content-img-${index}`}/>}
                        <motion.div>
                        {(div.title && div.type!="column") && ((!div.paragraphs && <motion.h1 key={`title-${index}`}>{div.title}</motion.h1>) || (div.paragraphs && <motion.h2 key={`title-${index}`}>{div.title}</motion.h2>))}
                            {div.paragraphs && div.paragraphs.map(para => {
                                return(
                                    (!para.type && <motion.p>{para}</motion.p>)
                                    ||
                                    (para.type=="span" && <motion.span>{para.text}</motion.span>)
                                    ||
                                    (para.type=="link" && <motion.a href={para.link}>{para.text}</motion.a>)
                                )
                            })}
                        </motion.div>
                    </motion.div>
            )})}
        </motion.div>
    );
}