import { useState } from "react";
import { api } from "@api/index";
interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export function useApi<T = any>(url: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: unknown) {
    setState((prev) => ({ ...prev, loading: true }));
    api
      .post(url, data)
      .then((response) => response.data)
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) => {
        setState((prev) => ({ ...prev, error, loading: false }));
      });
  }
  return [mutation, { ...state }];
}
