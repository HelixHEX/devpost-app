// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@env";
import { getItem, setItem } from "../libs/storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  useNavigationContainerRef,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { navigationRef } from "../navigation/RootNavigation";

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
  tagTypes: ["Feed", "User", "CheckEmail", "CheckUsername", "Projects"],
  endpoints: (builder) => ({}),
});

export const authApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    //------------------ MUTATIONS ------------------//
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      invalidatesTags: ["User", "Feed"],
      query: (payload) => ({
        body: {
          ...payload,
        },
        method: "PUT",
        url: "/profile/update",
      }),
      transformResponse: (response: ChangelogResponse, meta, arg) => {
        if (response.success) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Profile updated!",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.message,
          });
        }
        return response;
      },
    }),
    signin: builder.mutation<SigninResponse, SigninRequest>({
      invalidatesTags: ["User"],
      query: (payload) => ({
        body: {
          ...payload,
        },
        method: "POST",
        url: "/signin",
      }),
      transformResponse: async (response: SigninResponse) => {
        if (response.token) {
          await setItem({ key: "token", value: response.token });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.message,
          });
        }
        return response;
      },
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
          await setItem({ key: "token", value: response.token });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.message,
          });
        }
        return response;
      },
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
    //------------------ MUTATIONS ------------------//
    addProject: builder.mutation<ProjectResponse, ProjectRequest>({
      query: (project) => ({
        body: project,
        method: "POST",
        url: "/project/new",
      }),
      invalidatesTags: ["Projects"],
      transformResponse: (response: ProjectResponse) => {
        if (response.success) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Project created!",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.message,
          });
        }
        return response;
      },
    }),
    addChangelog: builder.mutation<ChangelogResponse, ChangelogRequest>({
      query: ({ changelog }) => ({
        body: changelog,
        method: "POST",
        url: "/changelog/new",
      }),
      invalidatesTags: ["Feed"],
      transformResponse: (response: ChangelogResponse, meta, arg) => {
        if (response.success) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Changelog created!",
          });
          arg.setBody("");
          arg.setTitle("");
          navigationRef.navigate("Feed");
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.message,
          });
        }
        return response;
      },
    }),
    //------------------ QUERIES ------------------//
    feed: builder.query<FeedResponse, void>({
      providesTags: ["Feed"],
      query: () => `/changelog/feed`,
    }),
    projects: builder.query<ProjectsResponse, string>({
      query: (id) => `/project/profile/${id}`,
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useSignedinUserQuery,
  useCheckEmailQuery,
  useCheckUsernameQuery,
  useUpdateProfileMutation,
} = authApi;
export const {
  useFeedQuery,
  useProjectsQuery,
  useAddProjectMutation,
  useAddChangelogMutation,
} = appApi;
