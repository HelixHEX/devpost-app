import axios from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { API_URL } from "@env";
import Toast from "react-native-toast-message";
import { getItem } from "../libs/storage";
axios.defaults.withCredentials = true;
export const queryClient = new QueryClient();

// QUERIES
export const getSignedinUser = async () => {
  const token = await getItem('token')
  const res = await axios.get(API_URL + "/profile/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}


// MUTATIONS

export interface signinCredentials {
  email?: string;
  username?: string;
  password: string;
}
const signin = async (credentials: signinCredentials) => {
  const res = await axios.post(API_URL + "/signin", credentials);
  return res.data;
};

export const useSignin = () => {
  return useMutation(signin, {
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid credentials",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    },
    onSuccess: ({ data }) => {
      if (data.message) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        queryClient.invalidateQueries(["user"]);
      }
    },
  });
};

export interface signupCredentials {
  name: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  birthday: string;
  pronouns: string;
}

const signup = async (credentials: signupCredentials) => {
  const res = await axios.post(API_URL + "/signup", credentials);
  return res.data;
};

export const useSignup = () => {
  return useMutation(signup, {
    onError: (error) => {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error signing up",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    },
    onSuccess: ({ data }) => {
      if (data.message) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        queryClient.invalidateQueries(["user"]);
      }
    },
  });
};
