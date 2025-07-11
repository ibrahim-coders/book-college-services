import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getMe: builder.query({
      query: () => 'userpage',
      providesTags: ['User'],
    }),
  }),
});

export const { useGetMeQuery } = userApi;
