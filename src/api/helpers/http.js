// @flow
import Cookies from "universal-cookie";
import {
  BASE_API_URL as BASE,
  METHODS,
  TOKEN_HEADER_NAME,
  TOKEN_COOKIE_ID
} from "./config";
import * as reqs from "./helpers";

export default class Fetch {
  constructor(method, url, data = {}, args = {}, withAuth = true) {
    this.method = method;
    this.data = data;
    this.headers = { "Content-Type": "application/json" };
    this.url = BASE + url;

    // Adds token to Authentication header
    if (withAuth) {
      this.headers[TOKEN_HEADER_NAME] = "Bearer " + TOKEN.get();
    }

    // Adds arguments to the header
    for (const key in args) {
      this.headers[key] = args[key];
    }
  }

  response(asForm = false) {
    if (asForm) {
      // Sends request with data as a FormData-object
      return reqs.formRequest(this.method, this.url, this.headers, this.data);
    } else {
      // Sends a normal request
      return reqs.request(this.method, this.url, this.headers, this.data);
    }
  }
}

class Token {
  constructor() {
    this.cookies = new Cookies();
  }

  set(token: string, expires_in: number = 3600): void {
    this.cookies.set(TOKEN_COOKIE_ID, token, {
      path: "/",
      expires: new Date(Date.now() + expires_in * 1000)
    });
  }

  get(): string {
    return this.cookies.get(TOKEN_COOKIE_ID);
  }

  remove(): void {
    this.cookies.remove(TOKEN_COOKIE_ID, { path: "/" });
  }
}

export const TOKEN = new Token();
