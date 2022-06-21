import { retrieveScoreboard, writeToScoreboard } from "./firebase";
import { useState, useEffect } from 'react';
import './styles/Scoreboard.css';

function Scoreboard (props) {
    const [scoreboard, setScoreboard] = useState(null);
    const [playerName, setPlayerName] = useState(null);

    useEffect(() => {
        async function getScores () {
            const scores = await retrieveScoreboard();
            scores.sort(function(a, b) {
                return a.time - b.time;
            });
            setScoreboard(scores);
        }
        getScores();
    }, [scoreboard])

    function handleSubmit (e) {
        e.preventDefault();
        const playerTime = props.time;
        writeToScoreboard(playerName, playerTime);
        e.target.setAttribute('disabled', true);
    }

    function handleChange (e) {
        setPlayerName(e.target.value)
    }

    const ScoreCard = (props) => {
        let rankIndex = props.rank + 1;
        return (
            <div className="card-container">
                <div className="ranking">{rankIndex}</div>
                <div className="name-div">{props.score.name}</div>
                <div className="time-div">{props.score.time} seconds</div>
            </div>
        )
    }

    const displayScoreboard = scoreboard?.map(((score, index) => {
            return <ScoreCard score = {score} rank = {index}/>
        }));

    return (
        <div className="scoreboard-container">
            <h1>You Win!</h1>
            <p>Time taken: {props.time} seconds</p>
            <p>Enter your name and hit 'submit' to submit your score to the scoreboard.</p>
            <form>
                <label>
                    Your name:
                    <input onChange={handleChange} className="name-input" type='text' required />
                    <button onClick={handleSubmit}>Submit</button>
                </label>
            </form>
            <div className="scoreboard-list" >
                <h2>Scoreboard</h2>
                {displayScoreboard}
            </div>
        </div>
    )
}

export default Scoreboard;
