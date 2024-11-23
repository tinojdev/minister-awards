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
      providesTags: (result, error, arg) => {
        if (!arg.categoryId) {
          return [{ type: "Vote", id: "LIST" }];
        }
        return [
          {
            type: "Vote",
            id: String(arg.categoryId),
          },
        ];
      },
    }),
    getAllVotes: build.query({
      query: () => "votes/",
      providesTags: ["Vote"],
    }),
    postVote: build.mutation({
      query: ({ categoryId, nominationId, order }) => {
        return {
          url: `votes/`,
          method: "POST",
          body: {
            category: categoryId,
            nomination: nominationId,
            order: order,
          },
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [
          { type: "Vote", id: String(arg.categoryId) },
          { type: "Vote", id: "LIST" },
        ];
      },
    }),
    deleteVote: build.mutation({
      query: ({ vote }) => {
        return {
          url: `votes/${vote.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [
          { type: "Vote", id: String(arg.vote.category) },
          { type: "Vote", id: "LIST" },
        ];
      },
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
