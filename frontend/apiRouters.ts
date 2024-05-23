export const apiRoutes = {
  logout: "/auth/signout",
};

export const pageRoutes = {
  main: "/",
  signIn: "/signIn",
  me: "/me",
  myVocabulary: "/me/vocabulary",
} as const;

export type RouteValue = (typeof pageRoutes)[keyof typeof pageRoutes];
