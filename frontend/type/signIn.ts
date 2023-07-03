interface IForm {
  phone: string;
  serverError?: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
  message?: string;
  accessToken?: string;
}
export type { IForm, TokenForm, MutationResult };
