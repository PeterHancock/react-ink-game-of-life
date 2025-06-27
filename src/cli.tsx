import { useState } from 'react';
import { render, Text, Box, useInput, Spacer } from 'ink';
import TextInput from 'ink-text-input';

import { GameOfLife } from './game-of-life/Component';

const UserControls: React.FC<{ onSize: (size: number) => void }> = ({ onSize }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const size = Number(input.trim());
    if (!isNaN(size) && size >= 10 && size <= 50) {
      onSize(size);
    }
  };

  useInput((_, key) => {
    if (key.return) {
      handleSubmit();
    } else if (key.ctrl && key.input === 'c') {
      process.exit(0);
    }
  });

  return (
    <Box flexDirection="column">
      <Box>
        <Text color="yellow">Enter grid size (10-50) ❯ </Text>
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          validate={(value: string) => {
            const num = Number(value.trim());
            return !isNaN(num) && num >= 10 && num <= 50;
          }}
        />
      </Box>
      <Text color="gray" italic>Press Enter to submit, ctr-c to exit</Text>
    </Box>
  );
};

const Grid: React.FC<{ size: number | undefined }>	 = ({ size }) => {

	if (!size ) {
		return null
	}

	return <GameOfLife size={size} />;
}

const CliApp = () => {
  const [size, setSize] = useState<number | undefined>();

  return (
    <>
      <Box marginLeft={5} marginBottom={1}>
        <Text color="green">Game of Life</Text>
      </Box>
     <Grid size={size} />
     <Box marginTop={1}>
      <UserControls onSize={setSize} />
      </Box>
    </>
  );
}

render(<CliApp />);
