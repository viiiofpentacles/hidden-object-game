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

function checkCoordinates (x , y) {
}

export { createTargetBox, checkCoordinates };