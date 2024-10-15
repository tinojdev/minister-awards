import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/`,
  }),
  reducerPath: "adminApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getNominationsByCategory: build.query({
      query: (categoryId) => `categories/${categoryId}/nominations/`,
    }),
    getCategories: build.query({
      query: () => "categories/",
    }),
    getVoters: build.query({
      query: () => "voters/?getTotalPoints=true",
    }),
    getVotesByNomination: build.query({
      query: ({ categoryId, nominationId }) =>
        `categories/${categoryId}/nominations/${nominationId}/vote`,
    }),
  }),
});

export const {
  useGetNominationsByCategoryQuery,
  useGetCategoriesQuery,
  useGetVotersQuery,
  useGetVotesByNominationQuery,
} = api;
