import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@redux/user/userSlice";

import { isNil } from "@utils/typeGuard";

import { IState } from "@redux/initialState";

export function useAuthentication() {
  const { data, error, loading } = useSelector(({ user }: IState) => user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNil(data)) return;
    dispatch(userActions.getUser());
  }, [dispatch, data]);

  return { data, error, loading };
}
