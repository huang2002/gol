import { worldWidth, worldHeight, world, ALIVE, DEAD } from './world.js';

const RESIZE_DELAY = 100;
const CONTAINER_PADDING = 16;

export const $color = X.toReactive('#000000');

let size = 1;

let marginLeft = 0;
let marginTop = 0;

const canvasListeners = navigator.maxTouchPoints > 0
    ? {
        touchstart(event) {
            const touch = event.changedTouches[0];
            toggleCell(touch.clientX, touch.clientY);
        }
    }
    : {
        mousedown(event) {
            toggleCell(event.clientX, event.clientY);
        },
    };

const canvas = X.createElement('canvas', {
    id: 'canvas',
    style: {
        backgroundColor: '#FFF',
        borderRadius: '3px',
        boxShadow: '0 0 6px #999',
    },
    listeners: canvasListeners,
},
    'Canvas Not Supported!'
);

export const canvasContainer = X.createElement('main', {
    id: 'canvas-container',
    style: {
        flex: '1',
        overflow: 'hidden',
    },
},
    canvas,
);

let resizeTimer = null;

const _resizeCanvas = () => {

    resizeTimer = null;

    const { width: _width, height: _height } = canvasContainer.getBoundingClientRect();
    const width = _width - CONTAINER_PADDING * 2;
    const height = _height - CONTAINER_PADDING * 2;
    const { style: canvasStyle } = canvas;
    const worldRatio = worldWidth / worldHeight;

    if (width / height > worldRatio) {
        marginLeft = CONTAINER_PADDING + (width - height) / 2;
        marginTop = CONTAINER_PADDING;
        canvas.width = height * worldRatio;
        canvas.height = height;
        size = height / worldHeight;
    } else {
        marginLeft = CONTAINER_PADDING;
        marginTop = CONTAINER_PADDING + (height - width) / 2;
        canvas.width = width;
        canvas.height = width / worldRatio;
        size = width / worldWidth;
    }

    canvasStyle.marginLeft = `${marginLeft}px`;
    canvasStyle.marginTop = `${marginTop}px`;

    context.clearRect(0, 0, canvas.width, canvas.height);
    renderCanvas();

};

export const resizeCanvas = () => {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    setTimeout(_resizeCanvas, RESIZE_DELAY);
};

window.addEventListener('resize', resizeCanvas);

const context = canvas.getContext('2d');

export const renderCanvas = () => {
    context.fillStyle = $color.current;
    world.forEach((row, i) => {
        row.forEach((cell, j) => {
            const x = j * size;
            const y = i * size;
            if (cell) {
                context.fillRect(x, y, size, size);
            } else {
                context.clearRect(x, y, size, size);
            }
        });
    });
};

/**
 * @param {number} x
 * @param {number} y
 */
export const toggleCell = (x, y) => {
    const i = Math.floor((y - marginTop) / size);
    const j = Math.floor((x - marginLeft) / size);
    world[i][j] = world[i][j] === DEAD ? ALIVE : DEAD;
    renderCanvas();
};
