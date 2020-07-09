import {
    MIN_WORLD_WIDTH, MAX_WORLD_WIDTH, setWorldWidth, worldWidth,
    MIN_WORLD_HEIGHT, MAX_WORLD_HEIGHT, setWorldHeight, worldHeight,
    resetWorld,
} from './world.js';
import { MIN_LOOP_DELAY, $loopDelay, loopTimer } from './loop.js';
import { resizeCanvas, renderCanvas } from './canvas.js';

X.insertStyle(`.${D.TEXT_INPUT_CLASS}`, {
    width: '4em',
});

const $moreVisible = X.toReactive(false);

const SETTINGS_LABEL_CLASS = X.createClass({
    display: 'inline-block',
    width: '8em',
    paddingRight: '1em',
    textAlign: 'right',
    whiteSpace: 'nowrap',
});

/**
 * @param {string} text
 * @param {string} target
 */
const SettingsLabel = (text, target) => (
    X.createElement('label', {
        class: SETTINGS_LABEL_CLASS,
        for: target,
    },
        text
    )
);

export const more = D.Mask({
    id: 'settings-layer',
    style: {
        display: $moreVisible.map(
            visible => visible ? 'block' : 'none'
        ),
    },
},
    D.DialogWindow({
        id: 'settings-window',
        style: {
            textAlign: 'center',
        },
    },
        X.createElement('h1', {
            class: D.HIGHLIGHT_CLASS,
            style: {
                fontSize: '1.5em',
            },
        },
            'More',
        ),
        X.createElement('form', {
            id: 'settings-form',
            action: 'javascript:;',
            style: {
                marginBottom: '1em',
            },
        },
            SettingsLabel('World Width:', 'width-input'),
            D.TextInput({
                id: 'width-input',
                type: 'number',
                min: MIN_WORLD_WIDTH,
                max: MAX_WORLD_WIDTH,
                step: '1',
                value: worldWidth,
                listeners: {
                    change(event) {
                        const width = +event.target.value || 0;
                        setWorldWidth(width);
                        if (width !== worldWidth) {
                            event.target.value = worldWidth;
                        }
                        resizeCanvas();
                    },
                },
            }),
            SettingsLabel('World Height:', 'height-input'),
            D.TextInput({
                id: 'height-input',
                type: 'number',
                min: MIN_WORLD_HEIGHT,
                max: MAX_WORLD_HEIGHT,
                step: '1',
                value: worldHeight,
                listeners: {
                    change(event) {
                        const height = +event.target.value || 0;
                        setWorldHeight(height);
                        if (height !== worldHeight) {
                            event.target.value = worldHeight;
                        }
                        resizeCanvas();
                    },
                },
            }),
            SettingsLabel('Loop Delay', 'delay-input'),
            D.TextInput({
                id: 'delay-input',
                type: 'number',
                min: MIN_LOOP_DELAY,
                step: '1',
                bind: $loopDelay,
            }),
        ),
        D.Section(null,
            D.Button({
                listeners: {
                    click() {
                        resetWorld();
                        if (!loopTimer) { // paused
                            renderCanvas();
                        }
                    },
                },
            },
                'Reset',
            ),
        ),
        D.Section(null,
            D.Button({
                listeners: {
                    click() {
                        $moreVisible.setSync(false);
                    },
                },
            },
                'Back'
            ),
        ),
        D.Section(null,
            D.Link({
                title: 'GitHub Repo',
                href: 'https://github.com/huang2002/gol',
            },
                '(github)',
            ),
        ),
    ),
);

export const toggleMore = () => {
    $moreVisible.set(visible => !visible);
};
