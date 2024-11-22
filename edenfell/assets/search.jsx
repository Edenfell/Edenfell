import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Search({expanded, setExpanded, content}) {
    let navigate = useNavigate();
    function loadSearchResults(searchPages) {
        navigate('/searchResults', {state:{search:searchPages}});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let searchTerm = event.target[0].value.toLowerCase();
        let foundPages = [];
        for(var key in content) {
            content[key].filter((page) => {
                let paragraph;
                console.log(page);
                let found = page.content.find((div) => {
                    if(div.paragraphs) {
                        let foundDiv = div.paragraphs.find((para) => {
                            if(!para.type) {
                                if(para.toLowerCase().includes(searchTerm)) {
                                    paragraph = para;
                                    return true;
                                }
                            } else{
                                console.log(para);
                                if(para.type=="table" || typeof para.type == "object") {
                                    para.content.map(r => {
                                        r.content.map(t => {
                                            if(t.text.toLowerCase().includes(searchTerm)) {
                                                paragraph = t;
                                                console.log(paragraph);
                                                return true;
                                            }
                                        })
                                    })
                                if(paragraph) return true;
                                } else {
                                    if(para.text.toLowerCase().includes(searchTerm)) {
                                        paragraph = para;
                                        return true;
                                    }
                                }
                            }
                            return false;
                        });
                        return foundDiv;
                    }
                })
                if(found) {
                    foundPages.push({page:page.page, divID:found.divID, query:searchTerm, url:page.url, para:paragraph});
                }
            });
        }
        setExpanded(false);
        loadSearchResults(foundPages);
    }
    return(
        (expanded &&
        <motion.form onSubmit={handleSubmit}>
            <motion.input type="text" placeholder="Search" autoComplete="off" name="searchfield" className='search-input'/>
        </motion.form>)
    );
}