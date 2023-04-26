import { baseApiSlice } from '../api/baseApiSlice';

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});


export const { useRegisterUserMutation } = authApiSlice;