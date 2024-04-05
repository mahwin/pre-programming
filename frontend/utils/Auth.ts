class AuthManager {
  private accessToken = "";

  set(accessToken: string) {
    this.accessToken = accessToken;
  }

  get() {
    return this.accessToken;
  }
}

const authManager = new AuthManager();
export { authManager };
