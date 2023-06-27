import React, {useEffect, useState} from 'react';
import { useLoaderData, useParams, useOutletContext} from 'react-router-dom';
import { motion } from 'framer-motion';
import Location from './locations';

export async function loader({params}) {
    return null;
}

export default function Content({className}) {
    let {contentPage} = useParams();
    console.log(contentPage);
    if(contentPage == "locations") {
        return <Location></Location>
    }
    if(contentPage == "map") {
        return <MapPage></MapPage>
    }
    let content = useOutletContext()[0];
    let portrait = useOutletContext()[1];
    let page = content.find((obj) => {return obj.page.toLowerCase() == contentPage;});
    return (
        <React.Suspense fallback={<h1>Loading...</h1>}>
            <motion.div className={className || 'content'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} id="lore">
                {page.content.map((div, index) => {
                    return(
                        <motion.div className={`content-div-${div.type}`} key={`content-div-${index}`}>
                            {div.img && (div.imgType != "right" || portrait)  && <motion.img src={`./${div.img}`} className={`content-img-${div.imgType}`} key={`content-img-${index}`}/>}
                            <motion.div key={index}>
                                {div.title && <motion.h2 key={`title-${index}`}>{div.title}</motion.h2>}
                                {div.paragraphs && div.paragraphs.map((para, pIndex) => {
                                    return(
                                        (!para.type && <motion.p key={`p-${index}-${pIndex}`}>{para}</motion.p>)
                                        ||
                                        (para.type=="cite" && <motion.cite key={`cite-${index}-${pIndex}`}>{para.text}</motion.cite>)
                                        ||
                                        (para.type=="li" && <motion.li key={`li-${index}-${pIndex}`}>{para.text}</motion.li>)
                                        ||
                                        (para.type=="highlight"&&<motion.div className='highlight'><motion.span className="highlightText">{para.highlight} </motion.span><motion.p>{para.text}</motion.p></motion.div>)
                                        ||
                                        (para.type="table" && <motion.table className="table">{para.content.map((r, ri) => {
                                            return(
                                                (r.content[0].type == "th" && <motion.thead key={"head"}><motion.tr key={"headRow"}>{r.content.map((t, ti) => {
                                                    return(
                                                        <motion.th key={`${ri}-th-${ti}`}>{t.text}</motion.th>
                                                    )
                                                })}</motion.tr></motion.thead>)
                                                ||
                                                (r.content[0].type == "td" && <motion.tbody><motion.tr>{r.content.map((t, ti) => {
                                                    return(
                                                        <motion.td key={`${ri}-th-${ti}`}>{t.text}</motion.td>
                                                    )
                                                })}</motion.tr></motion.tbody>)
                                            )
                                        })}</motion.table>)
                                    )
                                })}
                            </motion.div>
                            {div.img && (div.imgType == "right" && !portrait) && <motion.img src={`./${div.img}`} className={`content-img-${div.imgType}`} key={`content-img-${index}`}/>}
                        </motion.div>
                    )
                })}
            </motion.div>
        </React.Suspense>
    );
}