const open = require("open");
const settings = require("../settings");
const { AccessToken } = require("twitch");

const authBaseURL = "https://id.twitch.tv/oauth2/authorize?response_type=token";

function normalizeScopes(scopes) {
  if (typeof scopes === "string") {
    scopes = [scopes];
  } else if (!scopes) {
    scopes = [];
  }
  return scopes;
}

module.exports = class AuthProvider {
  constructor({
    clientId,
    scope = [],
    accessToken = null,
    redirectURI = "http://localhost",
    forceVerify = false,
  } = {}) {
    this.clientId = clientId;
    this.redirectURI = redirectURI;
    this.forceVerify = forceVerify;

    this.tokenType = "user";
    this.currentScopes = scope;
    this.accessToken = accessToken
      ? { access_token: accessToken, scope }
      : null;

    if (this.accessToken && this.accessToken.access_token) {
      this.accessToken = new AccessToken(this.accessToken);
    }

    this.__resolveToken = null;
    this.__rejectToken = null;
  }

  hasScopes(scopes) {
    return scopes.every((scope) => this.currentScopes.includes(scope));
  }

  getAuthUrl(scopes) {
    const redir = encodeURIComponent(this.redirectURI);

    return (
      `${authBaseURL}&client_id=${this.clientId}` +
      `&redirect_uri=${redir}&scope=${scopes.join(" ")}` +
      `&force_verify=${this.forceVerify ? "true" : "false"}`
    );
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  resolveToken(response) {
    this.__resolveToken && this.__resolveToken(response);
    this.__resolveToken = null;
  }

  rejectToken(error) {
    this.__rejectToken && this.__rejectToken(error);
    this.__rejectToken = null;
  }

  async refresh() {
    await settings.set("twitch.accessToken", null);
    return this.getAccessToken(this.currentScopes, { refresh: true });
  }

  getAccessToken(scopes = null, { refresh = false } = {}) {
    return new Promise((resolve, reject) => {
      scopes = normalizeScopes(scopes);

      // eslint-disable-next-line no-console
      // console.log("\x1b[35m%s\x1b[0m", `Twitch request scopes [${scopes}]`);

      const forceVerify = refresh || this.forceVerify;

      if (!forceVerify && this.accessToken && this.hasScopes(scopes)) {
        return resolve(this.accessToken);
      }

      this.__rejectToken = reject;
      this.__resolveToken = async ({ access_token }) => {
        this.currentScopes = [...new Set([...this.currentScopes, ...scopes])];
        const accessToken = { access_token, scope: this.currentScopes };
        this.accessToken = new AccessToken(accessToken);
        await settings.set("twitch.scope", this.currentScopes);
        await settings.set("twitch.accessToken", access_token);
        resolve(this.accessToken);
      };

      open(this.getAuthUrl(scopes));
    });
  }
};
