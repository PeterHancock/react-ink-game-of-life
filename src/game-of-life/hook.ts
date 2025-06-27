
import { useState, useEffect } from 'react';

import { createGrid, Transition, type GridCell } from '../grid';

const merge = (...cells: GridCell[]): [number, number, number, number] =>
  cells.reduce(
    (acc, c) => [
      acc[0] + c[0],
      acc[1] + c[1],
      acc[2] + c[2],
      acc[3] + c[3],
    ],
    [0, 0, 0, 0],
  );

const transition: Transition = (locality) => {
  const [middle, ...neigbours] = locality;

  const neigbourCount = merge(...neigbours)[0];

  const occupiedNeighbours = neigbours.filter(_ => _[0]);

  const color = merge(...occupiedNeighbours)
    .map((v) => v / Math.ceil(occupiedNeighbours.length))
    .slice(1) as [number, number, number];

  let alive = 0;

  if (middle[0]) {
    if (neigbourCount < 1 || neigbourCount > 3) {
      alive = 0
    } else {
      alive = 1;
    }
  } else {
    if (neigbourCount === 3) {
      alive = 1;
    } else {
      alive = 0;
    }
  }
  return [alive, ...color];
};

const createInitialGrid = (size: number) => {
  const initial = new Uint8ClampedArray(new ArrayBuffer(size * size * 4));
  initial.fill(0);
  for (let i = 0; i < size * size * 4; i += 4) {
    const present = Math.random() > 0.2 ? 1 : 0;
    initial[i] = present;
    if (present) {
      initial[i + 1] = Math.floor(Math.random() * 256);
      initial[i + 2] = Math.floor(Math.random() * 256);
      initial[i + 3] = Math.floor(Math.random() * 256);
    }
  }
  return initial;
}

const update = createGrid(transition);

export const useGolGrid = (size: number) => {
  const [grid, setGrid] = useState<Uint8ClampedArray<ArrayBuffer>>(() => createInitialGrid(size));

  useEffect(() => {
    const grid = createInitialGrid(size);
    const updateGrid = update(size, size, grid);
    setGrid(grid);

    const timer = setInterval(() => {
      setGrid(updateGrid());
    }, 1000 / 5);

    return () => {
      clearInterval(timer);
    };
  }, [size]);

  return grid;
}
