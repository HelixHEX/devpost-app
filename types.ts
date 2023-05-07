interface User {
  id: number;
  email: string;
  username: string;
  profile: Profile | null;
  profileId: number;
}

interface Profile {
  id: number;
  name: string;
  bio: string;
  pronouns: string;
}

type StackParamList = {
  Feed: undefined;
  Signin: undefined;
  Signup: undefined;
};
