import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const styles = {
	global: (props) => ({
		body: { 
			backgroundColor: mode('gray.100', 'gray.800')(props)
		}
	})
};

export const theme = extendTheme({ config, styles });