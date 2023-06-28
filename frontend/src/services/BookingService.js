import ApiService from "./ApiService";

export const apiBookService = async (data) => {
	return ApiService.fetchData({
		url: `/book-service`,
		method: 'post',
		data,
	});
};