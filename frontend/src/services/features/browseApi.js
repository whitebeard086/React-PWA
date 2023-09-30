import { apiSlice } from '../api/apiSlice';

export const browseApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBrowse: builder.query({
			query: () => '/browse',
			providesTags: ['Browse'],
		}),
		getCategoryByGet: builder.query({
			query: (slug) => `/browse/category/${slug}`,
			providesTags: (result, error, slug) => [{ type: 'BrowseCat', id: slug }],
		}),
	}),
});

export const { useGetBrowseQuery, useGetCategoryByGetQuery } = browseApi;

export function useBrowse() {
	const { data, status, categories, services, isLoading, isError } =
		useGetBrowseQuery(undefined, {
			selectFromResult: ({ data, isLoading, isError }) => ({
				data: data ?? {},
				status: data?.status,
				services: data?.categories?.services,
				categories: data?.categories,
				isLoading,
				isError,
			}),
		});

	return {
		browse: data,
		status,
		services,
		categories,
		isLoading,
		isError,
	};
}

export function useCategoryByGet(slug) {
	const { data, status, services, category, isLoading, isError, isSuccess } =
		useGetCategoryByGetQuery(slug, {
			selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
				data: data ?? {},
				status: data?.status,
				services: data?.category?.services,
				category: data?.category,
				isLoading,
				isError,
				isSuccess,
			}),
		});

	return {
		category,
		status,
		services,
		isLoading,
		isError,
		isSuccess,
	};
}
