import { retrieveScoreboard } from "./firebase";
import { useState, useEffect } from 'react';


function Scoreboard (props) {
    const [scoreboard, setScoreboard] = useState(null);

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
    }

    const ScoreCard = (props) => {
        return (
            <div className="card-container">
                <div className="name-div">{props.score.name}</div>
                <div className="time-div">{props.score.time} seconds</div>
            </div>
        )
    }

    const displayScoreboard = scoreboard?.map((score => {
            return <ScoreCard score = {score} />
        }));

    return (
        <div className="scoreboard-container">
            <h1>You Win!</h1>
            <p>Time taken: {props.time} seconds</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Your name:
                    <input type='text' required />
                    <button>Submit</button>
                </label>
            </form>
            <div className="scoreboard-list" >
                {displayScoreboard}
            </div>
        </div>
    )
}

export default Scoreboard;
