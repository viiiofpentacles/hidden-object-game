import { useState, useEffect } from 'react';
import { retrieveImage } from './firebase';
import { createTargetBox } from './gameplay';
import Scoreboard from './Scoreboard';
import SelectionMenu from './SelectionMenu';

function Game () {
    const [showMenu, setShowMenu] = useState(false);
    const [currentCoords, setCurrentCoords] = useState([0, 0]);
    const [timer, setTimer] = useState(0); //to start timer when begin button is clicked. timer stops if all found
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
    }

    function handleClick (event) {
        const clickTarget = event.target;
        if (clickTarget.tagName === 'IMG') {
        const xCoord = event.pageX;
        const yCoord = event.pageY;
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

    useEffect(() => {
        let resultArray = []
        Object.values(foundObjects).forEach(object => resultArray.push(object));
        if (resultArray.indexOf(false) === -1) {
            const img = document.getElementById('loaded-image');
            img.setAttribute('src', '');
            setGameOver(true); //setgameover, which stops timer and opens up scoreboard
        }
    }, [foundObjects])

    useEffect(() => {
        const menuXcoord = currentCoords[0] - 180 + 'px';
        const menuYCoord = currentCoords[1] - 225 + 'px';
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
                        <div>
                            Michelangelo
                        </div>
                        <div>
                            St Sebastian
                        </div>
                        <div>
                            <a href='https://en.wikipedia.org/wiki/Biagio_da_Cesena'>Minos</a>
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
            <Scoreboard />
            }
        </main>
    )
}

export default Game;