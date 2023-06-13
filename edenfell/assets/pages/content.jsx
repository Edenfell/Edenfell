import React, {useEffect, useState} from 'react';
import { useLoaderData, useParams, useOutletContext} from 'react-router-dom';
import { motion } from 'framer-motion';
import Location from './locations';

export async function loader({params}) {
    return null;
}

export default function Content({className}) {
    let {contentPage} = useParams();
    if(contentPage == "locations") {
        return <Location></Location>
    }
    if(contentPage == "map") {
        return <MapPage></MapPage>
    }
    let content = useOutletContext();
    let page = content.find((obj) => {return obj.page == contentPage;});
    return (
        <React.Suspense fallback={<h1>Loading...</h1>}>
            <motion.div className={className || 'content'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} id="lore">
                {page.content.map((div, index) => {
                    return(
                        <motion.div className={`content-div-${div.type}`} key={`content-div-${index}`}>
                            {div.img && div.imgType != "right"  && <motion.img src={`./${div.img}`} className={`content-img-${div.imgType}`} key={`content-img-${index}`}/>}
                            <motion.div key={index}>
                                {div.title && <motion.h2 key={`title-${index}`}>{div.title}</motion.h2>}
                                {div.paragraphs.map((para, pIndex) => {
                                    return(
                                        (!para.type && <motion.p key={`p-${index}-${pIndex}`}>{para}</motion.p>)
                                        ||
                                        (para.type=="cite" && <motion.cite key={`cite-${index}-${pIndex}`}>{para.text}</motion.cite>)
                                        ||
                                        (para.type=="li" && <motion.li key={`li-${index}-${pIndex}`}>{para.text}</motion.li>)
                                    )
                                })}
                                {/* {div.type=="list" &&
                                <motion.ul>
                                {div.paragraphs.map((para, pIndex) => {
                                    return(
                                        (!para.type && <motion.p key={`p-${index}-${pIndex}`}>{para}</motion.p>)
                                        ||
                                        (para.type=="cite" && <motion.cite key={`cite-${index}-${pIndex}`}>{para.text}</motion.cite>)
                                        ||
                                        (para.type=="li" && <motion.li key={`li-${index}-${pIndex}`}>{para.text}</motion.li>)
                                    )
                                })}
                                </motion.ul>} */}
                            </motion.div>
                            {div.img && div.imgType == "right" && <motion.img src={`./${div.img}`} className={`content-img-${div.imgType}`} key={`content-img-${index}`}/>}
                        </motion.div>
                    )
                })}
            </motion.div>
        </React.Suspense>
    );
}