# fetchApi

This is a very very (very) light alternative to Axios when using VueJS or Laravel in API mode (appliction/json header). 
It's based on the native javascript [Fetch] (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function.

# Usage
```javascript
import { fetchApi } from "@ncisrc/fetchApi";

const page = await fetchApi.get('https://www.google.com');

const reply = await fetchApi.post('http://my.api.com/', {
  data: 'hello world !'
});
```

# Authentication
**fetchApi** can automaticaly set a Bearer Token if your token is stored in a secure cookie in your browser. 

The default cookie name is `_appToken`

You can customize the cookie name by setting one of these environement variable in your .env file :
- `VUE_APP_TOKEN_COOKIE_NAME` : For VueJS projects
- `VITE_TOKEN_COOKIE_NAME`    : For ViteJS projects
- `MIX_TOKEN_COOKIE_NAME`     : For Laravel Mix projects

Take care to correctly set your cookie (Secure, SameSite, etc.). 

You can use https://github.com/ncisrc/cookies-storage if you want a simple way to set secure cookies.
