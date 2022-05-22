import { retrieveImage } from './firebase';

function Game () {
    retrieveImage();
    return (
        <main>
            <h1>Game</h1>
            <button>Begin!</button>
            <div className="people-container">
                Look for them:
            </div>
            <div className="image-container">       
                <img id="loaded-image" alt="The Last Judgment by Michalangelo" /> 
            </div>
        </main>
    )
}

export default Game;