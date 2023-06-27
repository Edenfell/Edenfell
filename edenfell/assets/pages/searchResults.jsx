import React, {useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SearchResults({className}) {
    let {state} = useLocation();
    let pages = state.search;
    useEffect(() => {
        scrollBy({behavior:"smooth", top:window.innerHeight});
    }, [])
    console.log(pages);
    if(pages.length > 0) {
        return(
            <motion.div className={"first-content"}>
                <motion.h1>Search for '{pages[0].query}': </motion.h1>
                <motion.div className={className}>
                    {pages.map((page) => {
                        console.log(page.url);
                        return(
                            <motion.div>
                                <Link to={page.url}><motion.h2 key={page.page}>{page.page}</motion.h2></Link>
                                <motion.p>
                                    {(!page.para.type && page.para)
                                    ||
                                    (page.para.text)}
                                </motion.p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </motion.div>
        );
    } else {
        return (
            <motion.div className={"first-content"}>
                <motion.h1>No Results Found! </motion.h1>
            </motion.div>
        );
    }
}