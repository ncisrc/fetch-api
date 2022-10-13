# fetchApi

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

This is a very light (<2Ko) alternative to Axios when using VueJS and/or Laravel in API mode (appliction/json header).

This library is based on the native javascript [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function.


## Usage
```javascript
import { fetchApi } from "@ncisrc/fetchApi";

const page = await fetchApi.get('https://www.google.com');

const reply = await fetchApi.post('http://my.api.com/', {
  data: 'hello world !'
});
```

## Authentication
**fetchApi** can automaticaly set a Bearer Token if your token is stored in a secure cookie in your browser.

The default cookie name is `_appToken`

You can customize the cookie name by setting one of these environement variable in your .env file :
- `VUE_APP_TOKEN_COOKIE_NAME` : For VueJS projects
- `VITE_TOKEN_COOKIE_NAME`    : For ViteJS projects
- `MIX_TOKEN_COOKIE_NAME`     : For Laravel Mix projects

Take care to correctly (and securely) set your cookie (Secure Flag, SameSite, check your CORS, etc.).

You can use https://github.com/ncisrc/cookies-storage if you want a simple library to set secure cookies in your JS frontend.

## Uploading files
**fetchApi** can upload files using the `upload` method:

index.html
```html
...
  <input id="inputFile" type="file" />
  <button onClick="upload()">
...
```

script.js
```js
import fetchApi from '@ncisrv/fetchApi'

async function upload() {
  const inputElt = document.getElementById('inputFile');
  return await fetchApi.upload('/upload', inputElt);
}
```

## Handling Errors

Most of time, you want to redirect your users to the login page/component if fetchApi get a `!response.ok` or an `HTTP 40X` error code.

You can acheive this by adding you fail handler, return `true` if you want to continue the fetchApi flow, `false` if you want to stop everything after you failHandler :

```javascript
fetchApi.failHandler((response) => {

  // Your tests on the FETCH response object

  // Your redirects

  return true; // true : continue, false : stop
});
```

Example :
```javascript
fetchApi.failHandler((response) => {

  const unauthentified = (response.status > 399 && response.status <500)

  if (unauthentified)
    window.location = '/login'

  return !unauthentified;
})
```
