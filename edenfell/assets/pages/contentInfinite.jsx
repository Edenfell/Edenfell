import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import Location from './locations'
import Footer from '../Footer';

export async function loader({params}) {
    return null;
}

export default function Content({className, content, portrait, pageName}) {
    if(pageName == "locations") {
        return (<Location></Location>);
    }
    let page;
    for(var key in content) {
        page = content[key].find((p) => {
            return p.page.toLowerCase() == pageName;
        });
        if(page) break;
    }
    return (
        <React.Suspense fallback={<h1>Loading...</h1>}>
            <motion.div className={className || 'content'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} id="lore">
                {page.content.map((div, index) => {
                    return(
                        <motion.div className={`content-div-${div.type}`} key={`content-div-${index}`}>
                            {(div.title && div.type=="column") && ((!div.paragraphs && <motion.h1 key={`title-${index}`}>{div.title}</motion.h1>) || (div.paragraphs && <motion.h2 key={`title-${index}`}>{div.title}</motion.h2>))}
                            {div.img && (div.imgType != "right" || portrait)  && <motion.img src={`./${div.img}`} className={`content-img-${div.imgType}`} key={`content-img-${index}`}/>}
                            <motion.div key={index}>
                            {(div.title && div.type!="column") && ((!div.paragraphs && <motion.h1 key={`title-${index}`}>{div.title}</motion.h1>) || (div.paragraphs && <motion.h2 key={`title-${index}`}>{div.title}</motion.h2>))}
                                {div.paragraphs && div.paragraphs.map((para, pIndex) => {
                                    return(
                                        (!para.type && <motion.p key={`p-${index}-${pIndex}`}>{para}</motion.p>)
                                        ||
                                        (para.type=="cite" && <motion.cite key={`cite-${index}-${pIndex}`}>{para.text}</motion.cite>)
                                        ||
                                        (para.type=="li" && <motion.li key={`li-${index}-${pIndex}`}>{para.text}</motion.li>)
                                        ||
                                        (para.type=="highlight"&&<motion.div className='highlight'><motion.span className="highlightText">{para.highlight} </motion.span><motion.p>{para.text}</motion.p></motion.div>)
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
                            {div.img && (div.imgType == "right" && !portrait) && <motion.img src={`./${div.img}`} className={`content-img-${div.imgType}`} key={`content-img-${index}`}/>}
                        </motion.div>
                    )
                })}
            </motion.div>
            {pageName == "fauna" && <Footer />}
        </React.Suspense>
    );
}