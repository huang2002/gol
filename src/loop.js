import { updateWorld } from './world.js';
import { renderCanvas } from "./canvas.js";

export const MIN_LOOP_DELAY = 50;

export const $loopDelay = X.toReactive(100);

export let loopTimer = null;

const loop = () => {
    updateWorld();
    renderCanvas();
    loopTimer = setTimeout(loop, $loopDelay.current);
};

export const startLoop = () => {
    if (loopTimer) {
        clearTimeout(loopTimer);
    }
    loopTimer = setTimeout(loop, $loopDelay.current);
};

export const stopLoop = () => {
    clearTimeout(loopTimer);
    loopTimer = null;
};
