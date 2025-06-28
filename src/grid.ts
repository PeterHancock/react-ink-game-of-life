export type GridCell = Uint8ClampedArray<ArrayBuffer>;

type Locality = [
  middle: GridCell,
  top: GridCell,
  right: GridCell,
  bottom: GridCell,
  left: GridCell,
];

export type Transition = (
  Locality: Locality
) => [number, number, number, number];

export const createGrid =
  (transition: Transition) =>
  (width: number, height: number, initial: Uint8ClampedArray<ArrayBuffer>) => {
    let current = initial;

    let next = new Uint8ClampedArray(new ArrayBuffer(width * height * 4));

    const wrap = (i: number) => (i === -1 ? width - 1 : i === width ? 0 : i);

    const getPixelAt = (i: number, j: number): GridCell => {
      const ii = i === -1 ? width - 1 : i === width ? 0 : i;
      const jj = j === -1 ? height - 1 : j === height ? 0 : j;
      const idx = (ii * width + wrap(jj)) * 4;
      return current.slice(idx, idx + 4);
    };

    const updateGrid = () => {
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const locality: Locality = [
            getPixelAt(i, j),
            getPixelAt(i - 1, j),
            getPixelAt(i, j + 1),
            getPixelAt(i + 1, j),
            getPixelAt(i, j - 1),
          ];
          const idx = (i * width + j) * 4;
          const cell = transition(locality);
          next[idx] = cell[0];
          next[idx + 1] = cell[1];
          next[idx + 2] = cell[2];
          next[idx + 3] = cell[3];
        }
      }

      [current, next] = [next, current];

      return current;
    };

    return updateGrid;
  };
