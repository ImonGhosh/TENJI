import { API_URL } from "@/utils/constants";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@/types";

export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    createUserQuery: build.mutation<void, { user: User }>({
      query: (body) => ({
        url: "users/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    validateEmailId: build.mutation<void, string>({
      query: (emailId) => ({
        url: "users/validateemail",
        method: "POST",
        body: { emailId },
      }),
    }),
  }),
});

export const { useCreateUserQueryMutation, useValidateEmailIdMutation } = userApi;
