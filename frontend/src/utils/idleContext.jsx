import { useIdle } from '@mantine/hooks';
import { createContext } from 'react';

export const IdleContext = createContext();

export const IdleProvider = ({ children }) => {
	// const isIdle = useIdle(3000, { events: ['click', 'touchstart'] });
	const isIdle = useIdle(3000000, { initialState: false }); // 5 minutes in milliseconds
	return <IdleContext.Provider value={isIdle}>{children}</IdleContext.Provider>;
};
