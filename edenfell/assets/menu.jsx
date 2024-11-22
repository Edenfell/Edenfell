import {AnimatePresence, easeIn, motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import Search from './search';

export const menuItems = [
  {
    title:'Characters',
    url:'/characters',
    submenu:[
      {
        title:"OCs",
        url:"https://docs.google.com/spreadsheets/d/12yVO4A95xaxOVuDDEqhCPwfCL_UmFNgSa7-pUv35LWM/edit?usp=sharing",
      },
      {
        title:"NPCs",
        url:"/npc",
      },
      {
        title:"Fame and Infamy",
        url:"/fame"
      }
    ],
  },
  {
    title:'World',
    url:'/world',
    submenu: [
      {
        title:"Lore",
        url:"/lore",
      },
      {
        title:"Locations",
        url:"/locations",
      },
      {
        title:"Races",
        url:"/races",
      },
      {
        title:"Religion",
        url:"/religion",
      },
      {
        title:"Flora",
        url:"/flora",
      },
      {
        title:"Fauna",
        url:"/fauna",
      },
      {
        title:"Magic",
        url:"/magic",
      },
      {
        title:"Factions",
        url:"/factions",
      }
    ],
  },
  {
    title:'Server',
    url:'/server',
    submenu:[
      {
        title:"Discord",
        url: "https://discord.gg/5NQpjnqAxS"
      },
    ]
  }
]

export default function Menu({expanded, portrait, setMenuIsExpanded, content}) {
  function clickedLink() {
    setMenuIsExpanded(false);
    const element = document.getElementsByClassName('content')[0];
    element.scrollIntoView({behavior:"smooth", block:"start", inline:"nearest"});
  }
  return(
      <motion.div layout="position" layoutDependency = {expanded} key={expanded} className="menu" transition = {{type:"tween", ease: "easeInOut"}} initial={(!portrait && {x:'-100vw'}) || (portrait && {y:'-100vh'})} animate={(!portrait && {x:expanded ? '0vw' : ['-20vw', '-100vw'], opacity:expanded ? [0, 1] : [1, 0]}) || (portrait && {y:expanded ? '0vh' : ['-20vh', '-100vh'], opacity:expanded ? [0, 1] : [1, 0]})}>
        <motion.div key={"search-bar"} layout className="search-bar">
          <Search expanded={expanded} setExpanded={setMenuIsExpanded} content={content}/>
        </motion.div>
        <motion.div key={"menu-items"} className="menu-items">
          {menuItems.map((item, index) => {
            return(expanded &&
              <div key={index+"-menu-items-list"} className={"menu-items-list"}>
                <h2 key={index+"-title"}>{item.title}</h2>
                <ul key={index+"-ul"}>
                  {item.submenu.map((subitem, subindex) => {
                    return(
                      <li key={index*10+subindex}>{((subitem.title != "Discord" && subitem.title != "OCs") && <Link key={subitem.title} to={item.url+subitem.url} onClick={clickedLink}>{subitem.title}</Link>) || (<motion.a href={subitem.url}>{subitem.title}</motion.a>)}</li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
  );
}