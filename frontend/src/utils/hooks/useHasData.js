import { useEffect, useState } from 'react';

export function useHasData(data) {
	const [hasData, setHasData] = useState(false);

	useEffect(() => {
		if (Array.isArray(data) && data.length > 0) {
			setHasData(true);
		} else if (data && Object.keys(data).length > 0) {
			setHasData(true);
		} else {
			setHasData(false);
		}
	}, [data]);

	return { hasData };
}
