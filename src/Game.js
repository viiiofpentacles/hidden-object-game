import { useState, useEffect, useRef } from 'react';
import { retrieveImage } from './firebase';
import { createTargetBox } from './gameplay';
import Scoreboard from './Scoreboard';
import SelectionMenu from './SelectionMenu';

function Game () {
    const [showMenu, setShowMenu] = useState(false);
    const [currentCoords, setCurrentCoords] = useState([0, 0]);
    const [begin, setBegin] = useState(false);
    const [timer, setTimer] = useState(0);
    const [foundObjects, setFoundObjects] = useState({
            'michelangelo': false,
            'st. sebastian': false,
            'minos': false,
        });
    const [gameOver, setGameOver] = useState(false);

    function handleBegin (event) {
        event.target.disabled = 'true';
        const imageContainer = document.querySelector('.image-container');
        imageContainer.style.pointerEvents = 'all';
        setBegin(true);
    }

    function handleClick (event) {
        const clickTarget = event.target;
        if (clickTarget.tagName === 'IMG') {
        const xCoord = event.nativeEvent.offsetX;
        const yCoord = event.nativeEvent.offsetY;
        setCurrentCoords([xCoord, yCoord]);
        createTargetBox(xCoord, yCoord);
        setShowMenu(true);
        }
    }

    function removeTBoxandSMenu () { //function to remove targeting box and selection menu
        const targetBox = document.querySelector('.target-box');
        targetBox.remove();
        setShowMenu(false);
    }

    function changeFoundObjectState (person) {
        setFoundObjects(foundObjects => ({
            ...foundObjects,
            [person]: true
        })
        );
    }

    function incrementTimer () {
        setTimer((timer) => timer + 1);
    }

    let startTimer = useRef(null);

    useEffect(() => {
        if (begin === true) {
            startTimer.current = setInterval(incrementTimer, 1000)
        }
        else {
            clearInterval(startTimer.current);
        }
    }, [begin])

    useEffect(() => {
        let resultArray = []
        Object.values(foundObjects).forEach(object => resultArray.push(object));
        if (resultArray.indexOf(false) === -1) {
            const img = document.getElementById('loaded-image');
            img.setAttribute('src', '');
            setGameOver(true); //setgameover, which opens up scoreboard
            setBegin(false); //stops timer
        }
    }, [foundObjects])

    useEffect(() => {
        const image = document.getElementById('loaded-image');
        const imageCoords = image.getBoundingClientRect();
        const menuXcoord = imageCoords.x + currentCoords[0] + 50 + 'px';
        const menuYCoord = currentCoords[1] - 50 + 'px';
        const selectionMenu = document.querySelector('.selection-menu');
        if (selectionMenu !== null) {
            selectionMenu.style.left = menuXcoord;
            selectionMenu.style.top = menuYCoord;
        }
    },[currentCoords])

    retrieveImage();

    return (
        <main>
            {gameOver === false &&
            <div className='game-div'>
                <h1>Game</h1>
                <button onClick={handleBegin}>Begin!</button>
                <div className="people-list">
                    Look for them:
                    <div className='people-container'>
                        <div className='mich-name'>
                            <a href='https://en.wikipedia.org/wiki/The_Last_Judgment_(Michelangelo)#Inserted_self-portrait' target='_blank'>Michelangelo</a>
                        </div>
                        <div className='seb-name'>
                            <a href='https://en.wikipedia.org/wiki/Saint_Sebastian' target='_blank'>St Sebastian</a>
                        </div>
                        <div className='min-name'>
                            <a href='https://en.wikipedia.org/wiki/Biagio_da_Cesena' target='_blank'>Minos</a>
                        </div>
                    </div>
                </div>
                <div className='feedback-container' />
                <div className="image-container" onClick={handleClick}>
                    {showMenu === true &&
                    <SelectionMenu coords={currentCoords} removeBoxes={removeTBoxandSMenu} changeFoundObjectState={changeFoundObjectState} />
                    }    
                    <img id="loaded-image" alt="The Last Judgment by Michalangelo" /> 
                </div>
            </div>
            }
            {gameOver === true &&
            <Scoreboard time={timer}/>
            }
        </main>
    )
}

export default Game;