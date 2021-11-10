import { useState } from 'react';

export const useAuth = (fun) => {
	const [loading, setloading] = useState(false);
	if (typeof fun !== 'function') return {};

	const request = async (...args) => {
		setloading(true);
		const response = await fun(...args);
		setloading(false);
		return response;
	};

	return { loading, request };
};
