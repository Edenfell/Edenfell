import React, {useState, useRef, useEffect} from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import './App.css';
import Navbar from './navbar';
import Landing from './landing.jsx';
import AudioPlayer from './audioplayer';
import { AnimatePresence} from 'framer-motion';
import * as songs from './music/songs';

export async function loader() {
  return fetch('/content.json');
}

export default function App() {
  let content = useLoaderData().pages;
  let songsArray = Object.values(songs);
  let audio = songsArray.at(Math.floor(Math.random()*(songsArray.length-1)));
  const[muted, setMuted] = useState(true);
  const[song, setSong] = useState(audio);
  // const[content, setContent] = useState(false);
  
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
  // useEffect(() => {
  //   // const fetchPages = async () => await fetch('/content.json').then((res) => res.json()).then(res => {content=res['pages']})
  //   const fetchPages = async () => {
  //     await fetch('./content.json').then((res) => res.json()).then(res => {setContent(res.pages);}).catch((err) => console.error(err));
  //   }
  //   fetchPages();
  // }, [])
  return (
    <>
      <Landing />
      <AudioPlayer muted={muted} toggleMute={toggleMute} nextSong={nextSong} song={song}/>
      <Navbar content={content}/>
      {content && <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>}
    </>
  );
}