import { canvasContainer, resizeCanvas } from './canvas.js';
import { controls } from "./controls.js";
import { resetWorld } from './world.js';
import { more } from './more.js';

document.body.appendChild(
    X.createElement('div', {
        id: 'app',
        style: {
            display: 'flex',
            position: 'fixed',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
        },
    },
        canvasContainer,
        controls,
        more,
    )
);

setTimeout(() => {
    resetWorld();
    resizeCanvas();
});
