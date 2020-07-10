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
    width: '6em',
    paddingRight: '.5em',
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
            '更多',
        ),
        X.createElement('form', {
            id: 'settings-form',
            action: 'javascript:;',
            style: {
                marginBottom: '1em',
            },
        },
            SettingsLabel('列数：', 'width-input'),
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
            X.createElement('br'),
            SettingsLabel('行数：', 'height-input'),
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
            X.createElement('br'),
            SettingsLabel('刷新间隔：', 'delay-input'),
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
                '重置',
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
                '返回',
            ),
        ),
        D.Section(null,
            D.Link({
                href: 'https://baike.baidu.com/item/%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F/2926434',
            },
                '百度百科',
            ),
            X.createElement('br'),
            D.Link({
                title: 'GitHub Repo',
                href: 'https://github.com/huang2002/gol',
            },
                'github',
            ),
        ),
    ),
);

export const toggleMore = () => {
    $moreVisible.set(visible => !visible);
};
