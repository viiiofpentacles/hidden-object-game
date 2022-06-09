import { checkCoordinates } from './gameplay';

function SelectionMenu (props) {
    function handleClickCheckCoords (e) {
        if (e.target.textContent === 'Michelangelo') {
            checkCoordinates(props.coords[0], props.coords[1], 'michelangelo');
        } else if (e.target.textContent === 'St. Sebastian') {
            checkCoordinates(props.coords[0], props.coords[1], 'st. sebastian');
        } else {
            checkCoordinates(props.coords[0], props.coords[1], 'minos');
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