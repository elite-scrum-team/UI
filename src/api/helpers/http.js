import Cookies from "universal-cookie";
import {
  BASE_API_URL as BASE,
  TOKEN_HEADER_NAME,
  TOKEN_COOKIE_ID
} from "./config";
import * as reqs from "./helpers";

export default class Fetch {
  constructor(method, url, data = null, args = {}, withAuth = true) {
    this.method = method;
    this.data = data;
    this.headers = { "Content-Type": "application/json" };
    this.url = BASE + url;

    // Adds token to Authentication header
    if (withAuth) {
      this.headers[TOKEN_HEADER_NAME] = "Bearer " + TOKEN.get();
    }
  }

  response(asForm = false) {
    if (asForm) {
      // Sends request with data as a FormData-object
      return new Package(
        reqs.formRequest(this.method, this.url, this.headers, this.data)
      );
    } else {
      // Sends a normal request
      return new Package(
        reqs.request(this.method, this.url, this.headers, this.data)
      );
    }
  }
}

class Package {
  constructor(response) {
    this.response = response
      .then(data => {
        if (!data) {
          data = {};
        }

        this.isError = !data.ok;
        this.status = data.status;

        return data.json ? data.json() : data;
      })
      .catch(error => console.log(error));
  }

  then(method) {
    return this.response.then(method);
  }
}

class Token {
  constructor() {
    this.cookies = new Cookies();
  }

  set(token, expires_in = 3600) {
    this.cookies.set(TOKEN_COOKIE_ID, token, {
      path: "/",
      expires: new Date(Date.now() + expires_in * 1000)
    });
  }

  get() {
    return this.cookies.get(TOKEN_COOKIE_ID);
  }

  remove() {
    this.cookies.remove(TOKEN_COOKIE_ID, { path: "/" });
  }
}

export const TOKEN = new Token();
