import { useState, useEffect } from 'react';
import { retrieveImage } from './firebase';
import { createTargetBox } from './gameplay';
import SelectionMenu from './SelectionMenu';

function Game () {
    const [showMenu, setShowMenu] = useState(false);
    const [currentCoords, setCurrentCoords] = useState([0, 0]);

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
            <div className="image-container" onClick={handleClick}>
                {showMenu === true &&
                <SelectionMenu />
                }    
                <img id="loaded-image" alt="The Last Judgment by Michalangelo" /> 
            </div>
        </main>
    )
}

export default Game;