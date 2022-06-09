import { findCoords } from './firebase';

function createTargetBox (x, y) {
    const prevTargetBox = document.querySelector('.target-box');
    if (prevTargetBox !== null) {
    prevTargetBox.remove();
    };
    const targetBox = document.createElement('div');
    const image = document.getElementById('loaded-image');
    const imageCoords = image.getBoundingClientRect();
    targetBox.style.left = x - imageCoords.x - (22) + 'px';
    targetBox.style.top = y - 200 - (32) + 'px';
    targetBox.classList.add('target-box');
    const imageContainer = document.querySelector('.image-container');
    imageContainer.appendChild(targetBox);
}

async function checkCoordinates (x , y, person) {
    const targetPerson = await findCoords(person);
    if ((x >= targetPerson.topLeftX) && (x <= targetPerson.bottomRightX)) {
        console.log('you got it right!');
    } else {
        console.log('You got it wrong!');
    }
}

export { createTargetBox, checkCoordinates };