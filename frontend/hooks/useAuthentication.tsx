import { useEffect } from "react";
import { useRouter } from "next/router";

import { isNil } from "@utils/typeGuard";

import { useUserInfo } from "./useUserInfo";

/**
 * 로그인 필요한 페이지에서 사용
 * 로그인이 안 되어 있는 경우에 로그인 페이지로 이동
 */
export function useAuthentication() {
  const { loading, data, error } = useUserInfo();

  const router = useRouter();
  useEffect(() => {
    if (isNil(loading) && error) router.push("/signIn");
  }, [loading, error, router]);

  return { data };
}
