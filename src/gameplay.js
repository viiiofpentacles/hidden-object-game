import { findCoords } from './firebase';

function createTargetBox (x, y) {
    const prevTargetBox = document.querySelector('.target-box');
    if (prevTargetBox !== null) {
    prevTargetBox.remove();
    };
    const targetBox = document.createElement('div');
    targetBox.style.left = x - 20 + 'px';
    targetBox.style.top = y - 35 + 'px';
    targetBox.classList.add('target-box');
    const imageContainer = document.querySelector('.image-container');
    imageContainer.appendChild(targetBox);
}

async function checkCoordinates (x , y, person) {
    const targetPerson = await findCoords(person);
    if ((x >= targetPerson.topLeftX) && (x <= targetPerson.bottomRightX) &&
        (y >= targetPerson.topLeftY && y <= targetPerson.bottomRightY)) {
        return 'correct';
    } else {
        return 'wrong';
    }
}

export { createTargetBox, checkCoordinates };