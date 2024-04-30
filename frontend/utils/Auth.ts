class AuthManager {
  private _accessToken: null | string;
  constructor() {
    this._accessToken = null;
  }

  set(accessToken: string | null) {
    this._accessToken = accessToken === "" ? null : accessToken;
  }

  get() {
    return this._accessToken;
  }
}

const authManager = new AuthManager();
export { authManager };
