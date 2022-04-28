# fetchApi

This is a very light (<2 Ko) alternative to Axios when using VueJS and/or Laravel in API mode (appliction/json header).
It's based on the native javascript [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function.

# Usage
```javascript
import { fetchApi } from "@ncisrc/fetchApi";

const page = await fetchApi.get('https://www.google.com');

const reply = await fetchApi.post('http://my.api.com/', {
  data: 'hello world !'
});
```

# Authentication
**fetchApi** can automaticaly set a Bearer Token if your token is stored in a secure cookie in your browser. The cookie can be crypted by your app with the [aes256](https://www.npmjs.com/package/aes256) javascript library to limit some cookies attacks.

The default cookie name is `_appToken`

You can customize the cookie name by setting one of these environement variable in your .env file :
- `VUE_APP_TOKEN_COOKIE_NAME` : For VueJS projects
- `VITE_TOKEN_COOKIE_NAME`    : For ViteJS projects
- `MIX_TOKEN_COOKIE_NAME`     : For Laravel Mix projects

If you add this variable in you .env, your cookie token will be decrypted with AES256 before every request:
- `VUE_APP_TOKEN_COOKIE_KEY` : For VueJS projects
- `VITE_TOKEN_COOKIE_KEY`    : For ViteJS projects
- `MIX_TOKEN_COOKIE_KEY`     : For Laravel Mix projects


Take care to correctly set your cookie (Secure, SameSite, CORS, etc.).

You can use https://github.com/ncisrc/cookies-storage if you want a simple way to set secure cookies.
