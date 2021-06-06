import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';

export interface Props {
  [key: string]: any;
}

export const ColorModeSwitch = (props: Props) => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="colorModeSwitch"
      size="lg"
      icon={colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      {...props}
    />
  );
};
