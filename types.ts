// SCREEN TYPES
type TabParamList = {
  Feed: undefined;
  NewChangelog: undefined;
  Profile: undefined
}

type StackParamList = {
  App: undefined;
  Signin: undefined;
  CreateUser: undefined;
  CreateProfile: {
    username: string;
    email: string;
    password: string;
  };
};

// MODEL TYPES
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


interface Project {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  profile?: Profile;
  profileId?: number;
  changelogs?: Changelog[];
}

interface Changelog {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  body: string;
  project?: Project;
  projectId?: number;
}

// RESPONSE TYPES

interface FeedResponse {
  feed?: Changelog[];
  success: boolean;
  message?: string;
}

interface UserResponse {
  user?: User;
  success: boolean;
  message?: string;
} 

interface SigninResponse {
  user?: User;
  token?: string;
  success: boolean;
  message?: string;
}

interface SignupResponse {
  user?: User;
  token?: string;
  success: boolean;
  message?: string;
}

interface EmailCheckResponse {
  success: boolean;
  message?: string;
}

interface UsernameCheckResponse {
  success: boolean;
  message?: string;
}

interface ProjectsResponse {
  projects: Project[];
  success: boolean;
}

interface ProjectResponse {
  project?: Project;
  success: boolean;
  message?: string;
}

interface ChangelogResponse {
  changelog?: Changelog;
  success: boolean;
  message?: string;
}

interface UpdateProfileResponse {
  user?: User;
  success: boolean;
  message?: string;
}

// REQUEST TYPES
interface SigninRequest {
  email?: string;
  username?: string;
  password: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  pronouns: string;
}

interface ProjectRequest {
  name: string;
  description: string;
}

interface ChangelogRequest {
  changelog: {
    title: string;
  body: string;
  projectName: string;
  },
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
}

interface UpdateProfileRequest {
  name: string;
  bio: string;
  pronouns: string;
  username: string;
  email: string;
}