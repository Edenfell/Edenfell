import React, {useEffect, useState} from 'react';
import { useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';

export async function loader() {
    let tempImages = [];
    tempImages.push(async() => {
        page.content.map((div) => {
            console.log(div);
            if(div.img) {
                let idx = div.img.indexOf('.');
                import(`./assets/img/${div.img.slice(0, idx)}${div.img.slice(idx)}`);
            }
        })
    })
}

export default function Lore({className, content}) {
    let page = content.find((obj) => {return obj.page == "lore";});
    let images = useLoaderData();

    return (
        <React.Suspense fallback={<h1>Loading...</h1>}>
            <motion.div className={className || 'content'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} id="lore">
                {page.content.map((div, index) => {
                    return(
                        <motion.div className={`content-div-${div.type}`} key={`content-div-${index}`}>
                            <motion.img src={images[index]} className={`content-img-${div.imgType}`} key={`content-img-${index}`}/>
                            <motion.div key={index}>
                                {div.title && <motion.h2 key={`title-${index}`}>{div.title}</motion.h2>}
                                {div.paragraphs.map((para, pIndex) => {
                                    return(
                                        (!para.type && <motion.p key={`p-${index}-${pIndex}`}>{para}</motion.p>)
                                        ||
                                        (para.type=="cite" && <motion.cite key={`cite-${index}-${pIndex}`}>{para.text}</motion.cite>)
                                    )
                                })}
                            </motion.div>
                        </motion.div>
                    )
                })}
            </motion.div>
        </React.Suspense>
    );
}