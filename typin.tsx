


// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

// export type RootStackParamList = {
//   Root: undefined;
//   SignUp: undefined;
//   SignIn: undefined;
//   Feed: undefined;
//   VerifyCode: undefined;
// };

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
//   NativeStackScreenProps<RootStackParamList, Screen>;

export interface User {
  id: number;
  email: string;
  username: string;
  profile: Profile | null;
  profileId: number;
}
export interface Profile {
  id: number;
  name: string;
  bio: string;
  pronouns: string;
}
