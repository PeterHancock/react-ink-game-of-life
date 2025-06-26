
export type GridCell = Uint8ClampedArray;

type Locality = [middle: GridCell, top: GridCell, right: GridCell, bottom: GridCell, left: GridCell];

export const createGrid = (transition: (locality: Locality) => [number, number, number, number]) => (width: number, height: number, grid: Uint8ClampedArray) => {

  const buffer = new Uint8ClampedArray(new ArrayBuffer(width * height * 4));

  const wrap = (i: number) => i === -1 ? width - 1 : i === width ? 0 : i;

  const getPixelAt = (i: number, j: number): GridCell => {
    const ii = i === -1 ? width - 1 : i === width ? 0 : i;
    const jj = j === -1 ? height - 1 : j === height ? 0 : j;
    const idx = (ii * width + wrap(jj)) * 4;
    return grid.slice(idx, idx + 4);
  }

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
        const next = transition(locality);
        buffer[idx] = next[0];
        buffer[idx + 1] = next[1];
        buffer[idx + 2] = next[2];
        buffer[idx + 3] = next[3];
      }
    }
    grid.set(buffer);
  }

  updateGrid();
  return grid;
}
