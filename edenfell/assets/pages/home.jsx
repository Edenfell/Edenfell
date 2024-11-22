import {React, useState} from 'react';
import { useOutletContext } from 'react-router-dom';
import {motion} from 'framer-motion';
import Content from './contentInfinite';
// import Server from './server';
// import World from './world';
// import Lore from './lore';
// import Locations from './locations';
// import Organizations from './organizations';
// import Nations from './nations';
// import Characters from './characters';
// import OCs from './ocs';
// import NPCs from './npcs';
import InfiniteScroll from 'react-infinite-scroll-component';

export async function loader() {
  return null;
}

export default function Home({className}) {
    let content = useOutletContext()[0];
    let portrait = useOutletContext()[1];
    let pagesArray = ["World", "lore", "locations", "races", "flora", "fauna"];
    const headers = ["World", "Characters", "Server"];
    const[loadedPages, setLoadedPages] = useState(pagesArray.slice(0,2));

    function loadNextPage() {
        setLoadedPages(loadedPages.concat(pagesArray[loadedPages.length]));
    }
    
    return (
        <InfiniteScroll
          dataLength={loadedPages.length}
          next={loadNextPage}
          hasMore={loadedPages.length < pagesArray.length} // Replace with a condition based on your data source
        >
          
          <motion.div  className={className || "first-content"}>
            <motion.div key="welcomeToEdenfell" className={'content'} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} id="home">
                <motion.h1>WELCOME TO EDENFELL</motion.h1>
                {loadedPages.map((Page) => {
                    return(
                      (headers.includes(Page) && <h1 key={"homeTitle"}>{Page}</h1>)  
                      ||
                      <Content key={Page} className={"content"} content={content} pageName={Page} portrait={portrait}/>
                      )
                    }
                    )
                }
            </motion.div>
          </motion.div>
        </InfiniteScroll>
    );
};