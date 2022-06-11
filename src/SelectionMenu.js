import { checkCoordinates } from './gameplay';

function SelectionMenu (props) {
    async function handleClickCheckCoords (e) {
        let result;
        let person;
        if (e.target.textContent === 'Michelangelo') {
            result = await checkCoordinates(props.coords[0], props.coords[1], 'michelangelo');
            person = 'michelangelo';
        } else if (e.target.textContent === 'St. Sebastian') {
            result = await checkCoordinates(props.coords[0], props.coords[1], 'st. sebastian');
            person = 'st. sebastian';
        } else {
            result = await checkCoordinates(props.coords[0], props.coords[1], 'minos');
            person = 'minos';
        }
        props.removeBoxes();
        const feedback = document.querySelector('.feedback-container');
        if (result === 'correct') {
            props.changeFoundObjectState(person);
            feedback.textContent = 'You found ' + person + '!';
        } else {
            feedback.textContent = 'That isn\'t ' + person + '!';
        }
    }

    return (
        <div className="selection-menu">
            <div className='selection-option' onClick={handleClickCheckCoords}>Michelangelo</div>
            <div className='selection-option' onClick={handleClickCheckCoords}>St. Sebastian</div>
            <div className='selection-option' onClick={handleClickCheckCoords}>Minos</div>
        </div>
    )
}

export default SelectionMenu;