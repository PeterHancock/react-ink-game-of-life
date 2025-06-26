
import { useState, useEffect } from 'react';
import  { render, Text, Box } from 'ink';

import { createGrid, type GridCell } from './grid';

const size = 40;

const initial = new Uint8ClampedArray(new ArrayBuffer(size * size * 4));
initial.fill(0);

for (let i = 0; i < size * size * 4; i += 4) {
	const present = Math.random() > 0.5 ? 1 : 0; 
	initial[i] = present;
	if (present) {
		initial[i + 1] = Math.floor(Math.random() * 256); // Red
		initial[i + 2] = Math.floor(Math.random() * 256); // Green
		initial[i + 3] = Math.floor(Math.random() * 256); // Blue		
	}
}

const sum = (...cells: GridCell[]): [number, number, number, number] => 
	cells.reduce(
		(acc, c) => [
			acc[0] + c[0],
			acc[1] + c[1],
			acc[2] + c[2],
			acc[3] + c[3]
		],
		[0, 0, 0, 0],
	);

const golUpdater = createGrid((locality) => {
	const [middle, ...neigbours] = locality;

	const neigbourCount = sum(...neigbours)[0];

	const occupiedNeighbours = neigbours.filter(_ => _[0]);

	const color = sum(...occupiedNeighbours)
		.map((v) => v / Math.ceil(occupiedNeighbours.length))
		.slice(1) as [number, number, number] ;

	let alive = 0;

	if (middle[0]) {
		if (neigbourCount < 1 || neigbourCount > 3) {
			alive = 0
		} else {
			alive = 1;
		}
	} else {
		if (neigbourCount === 3 ) {
			alive = 1;
		} else {
			alive = 0;
		}
	}
	return [alive, ...color];
});

const update = (grid: Uint8ClampedArray) => {
	return golUpdater(size, size, grid);
}

const displayGrid = (gridData: Uint8ClampedArray) => {
	const grid = [];
	for (let i = 0; i < size; i++) {
		const row = [];
		for (let j = 0; j < size; j++) {
			const [present, r, g, b]  = gridData.slice((i * size + j) * 4, (i * size + j + 1) * 4);
			row.push(<Text key={`${i}-${j}`} color={`rgb(${r}, ${g}, ${b})`}>{present ? '+' : ' '}</Text>);
		}
		grid.push(<Box key={i} gap={1}>{row}</Box>);
	}
	return grid;
}

const CliApp = () => {
	const [count, setCount] = useState(0);
	const [grid] = useState<Uint8ClampedArray>(initial);

	useEffect(() => {
		const timer = setInterval(() => {
			update(grid);
			setCount(prevCount => prevCount + 1);
		}, 1000 / 30);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<>
			{displayGrid(grid)}
			{<Text>Generation {count}</Text>}
		</>
	);
}

render(<CliApp />);

process.on('SIGINT', () => {
	process.exit(0);
});
