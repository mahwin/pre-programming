interface IForm {
  phone: string;
  serverError?: string;
}

interface TokenForm {
  token: string;
}

interface PhoneConfirmResponse {
  ok: boolean;
}

type TokenConfirmResponse =
  | {
      ok: true;
      accessToken: string;
      refreshToken: string;
    }
  | {
      ok: false;
      message: string;
    };

export type { IForm, TokenForm, TokenConfirmResponse, PhoneConfirmResponse };
