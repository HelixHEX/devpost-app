// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@env";
import { getItem, setItem } from "../libs/storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // baseUrl: 'http://192.168.86.189:500/v1',
    prepareHeaders: async (headers) => {
      const token = await getItem("token");
      if (!!token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      // headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: ["Feed", "User", "CheckEmail", "CheckUsername"],
  endpoints: (builder) => ({}),
});

export const authApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    //------------------ MUTATIONS ------------------//
    signin: builder.mutation<SigninResponse, SigninRequest>({
      invalidatesTags: ["User"],
      query: (payload) => ({
        body: {
          ...payload,
        },
        method: "POST",
        url: "/signin",
      }),
      transformResponse: async (response: SignupResponse) => {
        if (response.token) {
          await setItem({key: "token", value: response.token});
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.message,
          });
        }
        return response;
      }
    }),
    signup: builder.mutation<SignupResponse, SignupRequest>({
      invalidatesTags: ["User"],
      query: (payload) => ({
        body: {
          ...payload,
        },
        method: "POST",
        url: "/signup",
      }),
      transformResponse: async (response: SignupResponse) => {
        if (response.token) {
          await setItem({key: "token", value: response.token});
        } else {
          console.log("no token");
        }
        return response;
      }
    }),

    //------------------ QUERIES ------------------//
    signedinUser: builder.query<UserResponse, void>({
      providesTags: ["User"],
      query: () => "/profile/me",
    }),
    checkEmail: builder.query<EmailCheckResponse, string>({
      query: (email) => `/check/email/${email}`,
      providesTags: ["CheckEmail"],
    }),
    checkUsername: builder.query<UsernameCheckResponse, string>({
      query: (username) => `/check/username/${username}`,
      providesTags: ["CheckUsername"],
    }),
  }),
});

export const appApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    feed: builder.query<FeedResponse, void>({
      providesTags: ["Feed"],
      query: () => `/changelog/feed`,
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useSignedinUserQuery,
  useCheckEmailQuery,
  useCheckUsernameQuery,
} = authApi;
export const { useFeedQuery } = appApi;
