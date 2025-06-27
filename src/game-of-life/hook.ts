
import { useState, useEffect } from 'react';

import { createGrid, Transition, type GridCell } from '../grid.js';

type GridCellLike = [number, number, number, number];

const merge = (...cells: GridCell[]): GridCellLike =>
  cells.reduce(
    (acc, c) => acc.map((_, i) => _ + c[i]) as GridCellLike,
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
      for (let j = 0; j < 3; j++) {
        initial[i + 1 + j] = Math.floor(Math.random() * 256);
      }
    }
  }
  return initial;
}

const update = createGrid(transition);

export const useGolGrid = (size: number, frameRate: number = 1000 / 5) => {
  const [grid, setGrid] = useState<Uint8ClampedArray<ArrayBuffer>>(() => createInitialGrid(size));

  useEffect(() => {
    const grid = createInitialGrid(size);
    const updateGrid = update(size, size, grid);
    setGrid(grid);
    const timer = setInterval(() => {
      setGrid(updateGrid());
    }, frameRate);

    return () => {
      clearInterval(timer);
    };
  }, [size]);

  return grid;
}
