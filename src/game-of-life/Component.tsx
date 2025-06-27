import { useState, useEffect } from 'react';
import { Text, Box } from 'ink';

import { useGolGrid } from './hook';

const displayGrid = (size: number, gridData: Uint8ClampedArray) => {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const [present, r, g, b] = gridData.slice((i * size + j) * 4, (i * size + j + 1) * 4);
      row.push(<Text key={`${i}-${j}`} color={`rgb(${r}, ${g}, ${b})`}>{present ? '+' : ' '}</Text>);
    }
    grid.push(<Box key={i} gap={1}>{row}</Box>);
  }
  return grid;
}

export const GameOfLife: React.FC<{ size: number }> = ({ size }) => {
  const [count, setCount] = useState(0);

  const grid = useGolGrid(size);

  useEffect(() => {
    setCount(prevCount => prevCount + 1);
  }, [grid]);

  useEffect(() => {
    setCount(1);
  }, [size]);

  return (
    <>
      {displayGrid(size, grid)}
      {<Text>Generation {count}</Text>}
    </>
  );
}

