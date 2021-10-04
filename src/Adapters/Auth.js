import { API } from 'Utils';

export const getSanctumToken = async () => {
  try {
    await API.get('sanctum/csrf-cookie');
  } catch (error) {
    window.console.error('GETTING SANCTUM TOKEN ERROR', error.message);
    throw new Error('Unexpected error, failed to retrieve sanctum token');
  }
};

export const registerUser = async (user) => {
  try {
    const data = {
      ...user,
      terms: user.terms ? 1 : 0,
    };

    await API({
      method: 'POST',
      url: 'api/signup',
      headers: {
        Accept: 'application/json',
      },
      data,
    });

    return { message: 'Your account has been successfully created' };
  } catch (error) {
    window.console.error('REGISTRATION ERROR', error.message);
    throw new Error('Unexpected error, failed to register user');
  }
};

export const logInUser = async ({ email, password }) => {
  try {
    const data = {
      email,
      password,
    };

    await API.get('sanctum/csrf-cookie');
    const res = await API({
      method: 'POST',
      url: 'api/signin',
      headers: {
        Accept: 'application/json',
      },
      data,
    });

    const {
      data: { user, token },
    } = res || {};

    localStorage.setItem('AUTH', JSON.stringify({ user, token }));
    return { user, token, message: 'You have been successfully logged in' };
  } catch (error) {
    window.console.error('SIGN IN ERROR', error.message);
    throw new Error('Unexpected error, failed to sign in user');
  }
};

export const logOutUser = async (access_token) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${access_token}`);
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  localStorage.clear();

  await fetch('https://plant-it-api.herokuapp.com/api/logout', requestOptions);

  return { message: 'Successfully logged out user' };
};

export const checkLoginStatus = async (handleAuth, handleNoAuth) => {
  try {
    const auth = localStorage.getItem('AUTH');
    if (auth) {
      handleAuth(JSON.parse(auth));
    } else {
      handleNoAuth();
    }
  } catch (error) {
    window.console.error('CHECK USER STATUS ERROR', error.message);
    throw new Error('Unexpected error, failed to check user status');
  }
};
