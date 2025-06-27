
import readline from 'node:readline';

import { useState, useEffect } from 'react';
import { render, Text, Box, useStdin, useStdout } from 'ink';

import { GameOfLife } from './game-of-life/Component';

const CaptureSize: React.FC<{ onSize: (size: number) => void }> = ({ onSize }) => {

	const { stdin, setRawMode } = useStdin();

		const { stdout } = useStdout();

	useEffect(() => {
		setRawMode(true);
		const rl = readline.createInterface({
			input: stdin,
			output: stdout,
		});

		rl.on('line', (line) => {
			onSize(Number(line.trim()));
			stdout.moveCursor(0, -1);
  		stdout.clearLine(1);
		});

		return () => { };

	}, []);

	return (
		<Box>
			<Text color="yellow">Input a grid size (10-50)</Text>
		</Box>
	);

}

const CliApp = () => {

	const [size, setSize] = useState<number | undefined>();

	return (
		<>
			<Box>
				<Text color="green">Game of Life</Text>
			</Box>
			{size ? <GameOfLife size={size} /> : <CaptureSize onSize={setSize} />}
		</>
	);
}

render(<CliApp />);

process.on('SIGINT', () => {
	process.exit(0);
});
