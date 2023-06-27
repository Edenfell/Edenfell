import React, {useState, useRef, useEffect} from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import './App.css';
import Navbar from './navbar';
import Landing from './landing.jsx';
import AudioPlayer from './audioplayer';
import { AnimatePresence} from 'framer-motion';
import * as songs from './music/songs';

export async function loader() {
  return fetch('./content.json');
}

export default function App() {
  let content = useLoaderData();
  let songsArray = Object.values(songs);
  let audio = songsArray.at(Math.floor(Math.random()*(songsArray.length-1)));
  const[menuIsExpanded, setMenuIsExpanded] = useState(false);
  const[muted, setMuted] = useState(true);
  const[song, setSong] = useState(audio);
  // const[content, setContent] = useState(false);
  const mql = window.matchMedia("(orientation:portrait)");
  const [portrait, setPortrait] = useState(mql.matches);
  mql.onchange= (e) => {
      console.log("changing orientation");
      if(e.matches) {
          setPortrait(true);
      } else {
          setPortrait(false);
      }
  }
  function toggleMute() {
    console.log("toggle");
    setMuted(!muted);
  }
  function nextSong() {
    let nextIndex = Math.floor(Math.random()*(songsArray.length-1));
    audio = songsArray.at(nextIndex);
    if(song == audio) {
        audio = songsArray.at((nextIndex == 0) ? nextIndex+1 : nextIndex-1);
    }
    setSong(audio);
  }
  return (
    <>
      <Landing />
      <AudioPlayer muted={muted} toggleMute={toggleMute} nextSong={nextSong} song={song}/>
      <Navbar content={content} menuIsExpanded={menuIsExpanded} setMenuIsExpanded={setMenuIsExpanded}/>
      {content && <AnimatePresence mode="wait">
        <Outlet context={[content, portrait]}/>
      </AnimatePresence>}
    </>
  );
}