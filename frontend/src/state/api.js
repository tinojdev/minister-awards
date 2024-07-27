import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
	}),
	reducerPath: "adminApi",
	tagTypes: ["User"],
	endpoints: (build) => ({
		getNominations: build.query({
			query: () => "nominations",
			providesTags: ["Nominations"],
		}),
		getCategories: build.query({
			query: () => "categories",
			providesTags: ["Categories"],
		}),
	}),
});

export const { useGetNominationsQuery, useGetCategoriesQuery } = api;
