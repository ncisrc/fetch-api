/**
 * This is a simple script to get rid of the axios dependancy.
 * Very low footprint, it will use a cookie value as Bearer token if present in browser.
 *
 * Author: Mathieu LALLEMAND
 */
import { cookiesStorage } from '@ncisrc/cookies-storage';

const tokenCookieName = process.env.MIX_TOKEN_COOKIE_NAME
                     || process.env.VUE_APP_TOKEN_COOKIE_NAME
                     || process.env.VITE_TOKEN_COOKIE_NAME
                     || '_appToken';

let fetchApi_FailHandler = null;

export const fetchApi = {

  async get(url)          { return await this.doFetch('GET',    url); },
  async post(url, data)   { return await this.doFetch('POST',   url, data); },
  async patch(url, data)  { return await this.doFetch('PATCH',  url, data); },
  async put(url,data)     { return await this.doFetch('PUT',    url, data); },
  async delete(url)       { return await this.doFetch('DELETE', url); },
  async upload(url, file) { return await this.doUpload(url, file); },

  async doFetch(verb, url, data = null, isUpload = false) {
    let headersBase = new Headers();
        if (!isUpload) headersBase.append('Content-Type', 'application/json');
        headersBase.append('Accept', 'application/json');
        headersBase.append('X-Requested-With', 'XMLHttpRequest');

    const cookieTokenValue = cookiesStorage.getItem(tokenCookieName);
    if (cookieTokenValue) {
      headersBase.append ('Authorization', `Bearer ${cookieTokenValue}`);
    }

    const xsrfToken = cookiesStorage.getItem('XSRF-TOKEN');
    if (xsrfToken)
      headersBase.append('X-XSRF-TOKEN', xsrfToken);

    const response = await fetch(url, {
      method  : verb,
      headers : headersBase,
      body    : this.getBody(data, isUpload)
    });

    // check for error response
    if (!response.ok) {

      // First, let the user defined handler to things.
      if (fetchApi_FailHandler != null && !fetchApi_FailHandler(response)) return;

      const body  = await response.json();
      const error = {
        code    : response.status,
        message : body.message || 'Unkown error',
        errors  : body.errors  || []
      };
      throw error;
    }

    try { return await response.json(); }
    catch(e) { return ''; }
  },

  async doUpload(url, file) {
    const data = new FormData();
    data.append('file', file);
    return await this.doFetch('POST', url, data, true);
  },

  getBody(data, isUpload) {
    if (data != null) return isUpload ? data : JSON.stringify(data);
    return null;
  },

  async failHandler( func ) {
    fetchApi_FailHandler = func;
  },
};
