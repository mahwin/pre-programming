import { ComponentType, useEffect } from "react";
import { useAuthentication } from "@hooks/useAuthentication";

import { useRouter } from "next/router";

import { pageRoutes } from "../../apiRouters";

import { isNil } from "@utils/typeGuard";

interface Props<P> {
  WrappedComponent: ComponentType<P & { isLoggedIn?: boolean }>;
  mustLogin?: boolean;
}

export function WithAuthComponent<P extends JSX.IntrinsicAttributes>({
  WrappedComponent,
  mustLogin = false,
}: Props<P>) {
  return function Component(props: P) {
    const { data, error, loading } = useAuthentication();
    const router = useRouter();

    useEffect(() => {
      // 검증에 에러가 있고, 로그인이 반드시 필요한 페이지라면 로그인 페이지로 이동
      if (isNil(error) || !mustLogin) return;
      router.push(pageRoutes.signIn);
    }, [error]);

    if (!mustLogin)
      return <WrappedComponent {...props} isLoggedIn={!isNil(data)} />;

    if (loading) return <p>유저 정보를 확인하고 있습니다.</p>;

    return <WrappedComponent {...props} />;
  };
}
