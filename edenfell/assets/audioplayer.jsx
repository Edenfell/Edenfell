import React from 'react';
import {useRef, useEffect, useCallback, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ReactComponent as AudioImg} from './img/audio.svg';
import {ReactComponent as InfoImg} from './img/info-test.svg';
import {ReactComponent as MutedImg} from './img/audio-muted.svg';
import {ReactComponent as Arrow} from './img/arrow.svg';


export default function AudioPlayer({muted, toggleMute, nextSong, song}) {
    //VARIABLES
    let songName = song.replace("/assets/music/", "");
    songName = songName.replace("/assets/", "");
    if(songName.indexOf('.') !=-1) songName=songName.slice(0, songName.indexOf("."));
    if(songName.indexOf('-') !=-1) songName=songName.slice(0, songName.indexOf('-'));
    //VARIANTS
    const iconHover = {
        hover: {
            scale : 1.2
        },
        rest: {
            scale: 1
        }
    }
    const textHover = {
        hover: {
            opacity:1
        },
        rest: {
            opacity:0
        }
    }
    const divHover = {
        hover: {
            backgroundColor:'rgba(0,0,0,0.35)'
        },
        rest: {
            backgroundColor:'rgba(0,0,0,0)'
        }
    }
    // REFS
    const audioRef = useRef();
    const progressBarRef = useRef();
    const playAnimationRef = useRef();
    //STATES
    const[collapse, setCollapse] = useState(false);

    // ==== Functions ====
    // For Updating the Audio Progress Bar
    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        const seconds = audioRef.current.duration;
        progressBarRef.current.max = seconds;
        progressBarRef.current.value = currentTime;
        audioRef.current.volume = 0.3;
        playAnimationRef.current = requestAnimationFrame(repeat);
    })

    // For Pause/Play and calling the Progress Bar Update each frame
    useEffect(()=> {
        if(muted) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [muted, audioRef, repeat]);
    
    // For Seeking the audio through the Progress Bar
    function handleProgressBar() {
        audioRef.current.currentTime = progressBarRef.current.value;
    }

    // Collapsing/Expanding Audio Player
    function collapseAudioPlayer() {
        setCollapse(!collapse);
    }

    return (
        <motion.div className="audio-div">
            <AnimatePresence>
                <motion.div className="icons-div" key="icons" >
                    <motion.div className="info-div" key="info" initial="rest" whileHover="hover" exit="rest" variants={divHover}>
                        {!collapse && <motion.div className="song-name" key="song-name">
                            <motion.p variants={textHover} key="hover-p">{songName}</motion.p>
                        </motion.div> }
                        {!collapse && <motion.div className="info-icon" key="info-icon" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                            <InfoImg variants={iconHover} key="info-img"/>
                        </motion.div>}
                    </motion.div>
                    <audio key="audio" src={song} className="audio" autoPlay={true} muted={muted} ref={audioRef} onEnded={nextSong}/>
                    <motion.div onClick={toggleMute} variants={iconHover} className='audio-icon-div' key="audio-icon-div">
                        {!muted && <AudioImg key="audio-icon" className="audio-icon"/>}
                        {muted && <MutedImg key="muted-icon" className="muted-icon"/>}
                    </motion.div>
                </motion.div>
                {!collapse && <motion.div className="progress-bar-div" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                    <motion.input type="range" className="progress-bar" defaultValue="0" ref={progressBarRef} onChange={handleProgressBar}/>
                </motion.div>}
            </AnimatePresence>
            <motion.div className="collapse-player-div" onClick={collapseAudioPlayer} animate={{rotate : collapse ? 180 : 0, originY: '0.7vmax', originX: '0.4vmax'}}>
                <Arrow height="100%" width="100%"/>
            </motion.div>
        </motion.div>
    );
}