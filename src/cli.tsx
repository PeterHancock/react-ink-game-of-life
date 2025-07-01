import { useState } from 'react';
import { render, Text, Box, useInput } from 'ink';
import TextInput from 'ink-text-input';

import { GameOfLife } from './game-of-life/Component.js';

const UserControls: React.FC<{
  onSize: (size: number) => void;
  focus: boolean;
}> = ({ onSize, focus }) => {
  const [input, setInput] = useState('');

  const handleChange = (value: string) => {
    const sanitizedValue = value.trim().replace(/[^0-9\s]/g, '');
    setInput(sanitizedValue);
  };

  const handleSubmit = () => {
    const size = Number(input);
    if (!isNaN(size) && size >= 10 && size <= 50) {
      onSize(size);
    }
  };
  useInput((_, key) => {
    if (focus && key.return) {
      handleSubmit();
    }
  });

  return (
    <Box flexDirection="column">
      <Box>
        <Text color={focus ? '#ffff00' : '#777700'}>
          Enter grid size (10-50) ❯{' '}
        </Text>
        <TextInput
          focus={focus}
          value={input}
          onChange={handleChange}
        />
      </Box>
      <Text color="gray" italic>
        Press Enter to submit, Ctrl-C to quit
      </Text>
    </Box>
  );
};

const Grid: React.FC<{ size: number | undefined }> = ({ size }) => {
  if (!size) {
    return null;
  }
  return <GameOfLife size={size} />;
};

const CliApp = () => {
  const [size, setSize] = useState<number | undefined>();

  useInput((input, key) => {
    if (key.ctrl && input === 'c') {
      return process.exit(0);
    }
  });

  return (
    <>
      <Box marginLeft={5} marginBottom={1}>
        <Text color="green">Game of Life</Text>
      </Box>
      <Grid size={size} />
      <Box marginTop={1}>
        <UserControls onSize={setSize} focus={true} />
      </Box>
    </>
  );
};

render(<CliApp />);
