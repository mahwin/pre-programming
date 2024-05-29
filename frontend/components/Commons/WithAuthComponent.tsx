import { type PropsWithChildren, useEffect } from "react";
import { useAuthentication } from "@hooks/useAuthentication";

import { useRouter } from "next/router";

import { pageRoutes } from "../../apiRouters";

import { isNil } from "@utils/typeGuard";

interface Props {
  mustLogin?: boolean;
}

export function WithAuthComponent({
  children,
  mustLogin = false,
}: Props & PropsWithChildren) {
  const { data, error } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    // 검증에 에러가 있고, 로그인이 반드시 필요한 페이지라면 로그인 페이지로 이동
    if (isNil(error) && !mustLogin) return;

    router.push(pageRoutes.signIn);
  }, [error]);

  // 로그인 데이터가 있으면 children을 반환
  if (data) return <>{children}</>;

  // 로그인 데이터가 없고 반드시 로그인이 필요한 페이지라면 loading을 반환
  if (mustLogin) return <p>로그인 정보를 확인하고 있습니다.</p>;

  // 로그인이 필요하지 않은 페이지라면 children을 반환
  return <>{children}</>;
}
