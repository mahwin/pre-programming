import { ReactNode, createContext, useMemo, useCallback } from "react";
import { authManager } from "@modules/Auth";
import { useUserInfo } from "@hooks/useUserInfo";
import type { UserInfo } from "@type/commons/user";
import { api } from "@api/index";
import { apiRoutes } from "../apiRouters";

import { useRouter } from "next/router";

type AuthContextType = {
  userInfo: UserInfo | null;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  login: () => {},
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { data: userInfo } = useUserInfo();
  const router = useRouter();

  const handleLogin = useCallback(() => {}, []);

  const handleLogout = useCallback(() => {
    api.get(apiRoutes.logout);
    authManager.set("");
    router.reload();
  }, []);

  const contextValue = useMemo(
    () => ({
      userInfo,
      login: handleLogin,
      logout: handleLogout,
    }),
    [userInfo]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// const Context = createContext();

// const Provider = ({children}) => {
// 	const [data, setData] = useState();

// 	return (
// 		<Context.Provider value={{data, setData}}>
// 			{children}
// 		</Context.Provider>
// 	)
// }

// export { context, Provider };
