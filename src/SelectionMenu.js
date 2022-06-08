import { useEffect } from 'react';
import { checkCoordinates } from './gameplay';

function SelectionMenu (props) {
    const getCoords = props.coords;
    const selectionMenu = document.querySelector('.selection-menu');

    useEffect(() => {
    if (selectionMenu !== null) {
        selectionMenu.style.left = getCoords[0] - 180 + 'px';
        selectionMenu.style.top = getCoords[1] - 225 + 'px';
    }
    },);

    return (
        <div className="selection-menu">
            <div className='selection-option'>Michalangelo</div>
            <div className='selection-option'>St. Sebastian</div>
            <div className='selection-option'>Minos</div>
        </div>
    )
}

export default SelectionMenu;