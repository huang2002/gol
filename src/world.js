export const MIN_WORLD_WIDTH = 10;
export const MIN_WORLD_HEIGHT = 10;
export const MAX_WORLD_WIDTH = 128;
export const MAX_WORLD_HEIGHT = 128;

const MAX_ALIVE = 3;
const MIN_ALIVE = 2;
const SPAWN_THRESHOLD = .6;

export const ALIVE = 1;
export const DEAD = 0;

export let worldWidth = 60;
export let worldHeight = 60;

const array = (length, init) => Array.from({ length }, () => init);

export const setWorldWidth = width => {

    let newWidth;

    if (width > MAX_WORLD_WIDTH) {
        newWidth = MAX_WORLD_WIDTH;
    } else if (width < MIN_WORLD_WIDTH) {
        newWidth = MIN_WORLD_WIDTH;
    } else {
        newWidth = width;
    }

    if (worldWidth < newWidth) {
        world.forEach(row => {
            for (; worldWidth < newWidth; worldWidth++) {
                row.push(DEAD);
            }
        });
    }

};

export const setWorldHeight = height => {

    let newHeight;

    if (height > MAX_WORLD_HEIGHT) {
        newHeight = MAX_WORLD_HEIGHT;
    } else if (height < MIN_WORLD_HEIGHT) {
        newHeight = MIN_WORLD_HEIGHT;
    } else {
        newHeight = height;
    }

    for (; worldHeight < newHeight; worldHeight++) {
        world.push(array(worldWidth, DEAD));
    }

};

export const world = Array.from(
    { length: worldHeight },
    () => array(worldWidth, DEAD)
);

export const updateWorld = () => {

    const _world = world.map(row => row.slice());

    world.forEach((row, i) => {

        if (i >= worldHeight) {
            return;
        }

        row.forEach((current, j) => {

            if (j >= worldWidth) {
                return;
            }

            const _row = _world[i];
            let alive = 0;
            let tempRow;

            // count the row above
            if (i > 0) {
                tempRow = _world[i - 1];
                if (j > 0) {
                    alive += tempRow[j - 1];
                }
                alive += tempRow[j];
                if (j + 1 < worldWidth) {
                    alive += tempRow[j + 1];
                }
            }

            // count current row
            if (j > 0) {
                alive += _row[j - 1];
            }
            if (j + 1 < worldHeight) {
                alive += _row[j + 1];
            }

            // count the row below
            if (i + 1 < worldHeight) {
                tempRow = _world[i + 1];
                if (j > 0) {
                    alive += tempRow[j - 1];
                }
                alive += tempRow[j];
                if (j + 1 < worldHeight) {
                    alive += tempRow[j + 1];
                }
            }

            // update
            if (alive === MAX_ALIVE) {
                row[j] = ALIVE;
            } else if (alive > MAX_ALIVE || alive < MIN_ALIVE) {
                row[j] = DEAD;
            }

        });

    });

};

export const resetWorld = () => {
    for (let i = 0; i < worldHeight; i++) {
        for (let j = 0; j < worldWidth; j++) {
            world[i][j] = Math.random() > SPAWN_THRESHOLD ? ALIVE : DEAD;
        }
    }
};
