import { updateWorld } from './world.js';
import { renderCanvas } from "./canvas.js";
import { toggleMore } from './more.js';
import { startLoop, stopLoop } from './loop.js';

const START_TEXT = 'Start';
const STOP_TEXT = 'Stop';

const $toggleText = X.toReactive(START_TEXT);

/**
 * @param {string} text
 * @param {() => void} listener
 */
const Control = (text, listener) => (
    D.Button({
        listeners: {
            click: listener,
        },
    },
        text
    )
);

export const controls = X.createElement('div', {
    id: 'controls',
    style: {
        padding: '0 1em 1em',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflowY: 'auto',
        userSelect: 'none',
    },
},
    Control($toggleText, () => {
        if ($toggleText.current === START_TEXT) { // start
            $toggleText.setSync(STOP_TEXT);
            startLoop();
        } else { // stop
            $toggleText.setSync(START_TEXT);
            stopLoop();
        }
    }),
    Control('Step', () => {
        updateWorld();
        renderCanvas();
    }),
    Control('More', toggleMore),
);
