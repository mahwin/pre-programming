import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { IState } from "@redux/initialState";

import { userActions } from "@redux/user/userSlice";

import { isNil } from "@utils/typeGuard";

export function useUserInfo() {
  const { data, loading, error } = useSelector((state: IState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNil(data)) return;
    dispatch(userActions.getUser());
  }, [dispatch, data]);

  return { data, loading, error };
}
