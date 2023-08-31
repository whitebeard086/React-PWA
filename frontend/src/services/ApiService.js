import BaseService from './BaseService';

const ApiService = {
	fetchData(param) {
		return new Promise((resolve, reject) => {
			BaseService(param)
				.then((response) => {
					resolve(response);
				})
				.catch((errors) => {
					reject(errors);
				});
		});
	},
};

export const ApiQueryService = {
	fetchData(param) {
		return new Promise((resolve, reject) => {
			BaseService(param)
				.then((response) => {
					resolve(response.data ? response.data : null);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};

export default ApiService;
