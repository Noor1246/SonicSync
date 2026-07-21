import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/songs",
    }),
    getSongsByGenre: builder.query({
      query: () => "/songs",
    }),
    getSongDetails: builder.query({
      query: () => "/songs",
    }),
    getSongRelated: builder.query({
      query: () => "/songs",
    }),
    getArtistDetails: builder.query({
      query: () => "/songs",
    }),
    getSongsBySearch: builder.query({
      query: () => "/songs",
    }),
    getSongsByCountry: builder.query({
      query: () => "/songs",
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
  useGetSongsByCountryQuery,
} = shazamCoreApi;