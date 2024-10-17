import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    headers: {
      "Content-Type": "application/json",
    },
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
    getVotes: build.query({
      query: ({ categoryId, nominationId, onlyPersonalVotes }) => {
        return {
          params: {
            categoryId: categoryId,
            nominationId: nominationId,
            onlyPersonalVotes: onlyPersonalVotes,
          },
          url: `votes/`,
        };
      },
    }),
    postVote: build.mutation({
      query: ({ categoryId, nominationId, weight }) => {
        return {
          url: `votes/`,
          method: "POST",
          body: {
            category: categoryId,
            nomination: nominationId,
            voter: "Tino",
            weight: weight,
          },
        };
      },
    }),
    deleteVote: build.mutation({
      query: ({ voteId }) => {
        return {
          url: `votes/${voteId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetNominationsByCategoryQuery,
  useGetCategoriesQuery,
  useGetVotersQuery,
  useGetVotesByNominationQuery,
  useGetVotesQuery,
  usePostVoteMutation,
  useDeleteVoteMutation,
} = api;
