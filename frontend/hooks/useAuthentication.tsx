import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@redux/user/userSlice";

import { pageRoutes } from "../apiRouters";

import { isNil } from "@utils/typeGuard";

import { IState } from "@redux/initialState";

export function useAuthentication() {
  const { data, error } = useSelector(({ user }: IState) => user);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNil(data)) return;
    dispatch(userActions.getUser());
  }, [dispatch, data]);

  useEffect(() => {
    if (error) router.push(pageRoutes.signIn);
  }, [error]);

  const isAuthenticated = useMemo(() => !isNil(data), [data]);

  return { isAuthenticated };
}
