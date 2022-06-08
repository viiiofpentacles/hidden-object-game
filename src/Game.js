import { retrieveImage } from './firebase';
import { createTargetBox, displaySelectionMenu } from './gameplay';

function Game () {
    function handleBegin (event) {
        event.target.disabled = 'true';
        const imageContainer = document.querySelector('.image-container');
        imageContainer.style.pointerEvents = 'all';
    }

    function handleClick(event) {
        const clickTarget = event.target;
        if (clickTarget.tagName === 'IMG') {
        const xCoord = event.pageX;
        const yCoord = event.pageY;
        createTargetBox(xCoord, yCoord);
        //selection box popup
        }
    }

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
                <img id="loaded-image" alt="The Last Judgment by Michalangelo" /> 
            </div>
        </main>
    )
}

export default Game;