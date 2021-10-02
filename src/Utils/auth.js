import Cookies from 'js-cookie';
import cookie from 'cookie';

const COOKIE_NAME = 'plant_it_user_session';

export const isLoggedIn = (reqCookies = null) => {
  // if we don't have request cookies, get the cookie from client
  if (!reqCookies) {
    return !!Cookies.get(COOKIE_NAME);
  }
  // otherwise get cookie from server
  return !!cookie.parse(reqCookies)[COOKIE_NAME];
};

export const logIn = (push) => {
  Cookies.set(COOKIE_NAME, true, { expires: 86400, sameSite: 'lax' });
  push('/dashboard');
};

export const logOut = (push) => {
  if (typeof window !== 'undefined') {
    // remove logged in user's cookie and redirect to login page
    Cookies.remove(COOKIE_NAME, { expires: 86400, sameSite: 'lax' });
    push('/');
  }
};
