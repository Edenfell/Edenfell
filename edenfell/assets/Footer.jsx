import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {menuItems as menuItems} from "./menu"

export default function Footer() {
    console.log(menuItems)
    return(
        <motion.footer>
            <motion.div className="footer-div">
                <motion.div className="footer-links-div">
                    {menuItems.map((item, index) => {
                        return(
                        <div key={index+"-menu-items-list"} className={"footer-items-list"}>
                            <h2 key={index+"-title"}>{item.title}</h2>
                            <ul key={index+"-ul"}>
                            {item.submenu.map((subitem, subindex) => {
                                return(
                                <li key={index*10+subindex}>{((subitem.title != "Discord" && subitem.title != "OCs") && <Link key={subitem.title} to={item.url+subitem.url}>{subitem.title}</Link>) || (<motion.a href={subitem.url}>{subitem.title}</motion.a>)}</li>
                                );
                            })}
                            </ul>
                        </div>
                        );
                    })}
                </motion.div>
                <motion.div className="footer-credits-div">
                    Made with <motion.span>❤️</motion.span> and <motion.span>☕</motion.span> by Shiv
                </motion.div>
            </motion.div>
        </motion.footer>
    )
}