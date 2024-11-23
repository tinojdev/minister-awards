import { getLocalStorageState } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    headers: {
      "Content-Type": "application/json",
    },
    prepareHeaders: (headers) => {
      headers.append("X-Personal-Id", getLocalStorageState("personalId"));
    },
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/`,
  }),
  reducerPath: "adminApi",
  tagTypes: ["Vote"],
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
      providesTags: ["Vote"],
    }),
    getAllVotes: build.query({
      query: () => "votes/",
      providesTags: ["Vote"],
    }),
    postVote: build.mutation({
      query: ({ categoryId, nominationId, weight }) => {
        return {
          url: `votes/`,
          method: "POST",
          body: {
            category: categoryId,
            nomination: nominationId,
            weight: weight,
          },
        };
      },
      invalidatesTags: ["Vote"],
    }),
    deleteVote: build.mutation({
      query: ({ voteId }) => {
        return {
          url: `votes/${voteId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Vote"],
    }),
  }),
});

export const {
  useGetNominationsByCategoryQuery,
  useGetCategoriesQuery,
  useGetVotersQuery,
  useGetAllVotesQuery,
  useGetVotesByNominationQuery,
  useGetVotesQuery,
  usePostVoteMutation,
  useDeleteVoteMutation,
} = api;
