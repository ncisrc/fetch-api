/**
 * This is a simple script to get rid of the axios dependancy.
 * Very low footprint, it will use the _appToken cookie value (base64 encoded)
 * as Bearer token if present in browser.
 *
 * Author: Mathieu LALLEMAND
 */
import { cookiesStorage } from 'cookies-storage';

export const fetchApi = {
  get(url)         { return this.doFetch('GET',    url); },
  post(url, data)  { return this.doFetch('POST',   url, data); },
  patch(url, data) { return this.doFetch('PATCH',  url, data); },
  put(url,data)    { return this.doFetch('PUT',    url, data); },
  delete(url)      { return this.doFetch('DELETE', url); },

  async doFetch(verb, url, data = null) {
    let headersBase = new Headers();
        headersBase.append("Content-Type",     "application/json");
        headersBase.append("Accept",           "application/json");
        headersBase.append("X-Requested-With", "XMLHttpRequest");

    const appToken = atob(cookiesStorage.getItem('_appToken'));
    if (appToken)
      headersBase.append ("Authorization", `Bearer ${appToken}`);

    const response = await fetch(url, {
      method: verb,
      headers: headersBase,
      body: (data != null) ? JSON.stringify(data) : null
    });

    // check for error response
    if (!response.ok) {
      const body = await response.json();

      // Get error message from body or default to response status
      const error = {
        code    : response.status,
        message : body.message || 'Unkown error',
        errors  : body.errors || []
      }
      throw error;
    }

    return response.json();
  }
}
