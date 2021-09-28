const SERVER_API = process.env.REACT_APP_SERVER_API;

export const registerUser = async (user) => {
  try {
    const url = `${SERVER_API}api/signup`;

    const body = JSON.stringify({
      ...user,
      terms: user.terms ? 1 : 0,
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body,
    });

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('REGISTRATION ERROR', error.message);
    throw new Error('Unexpected error, failed to register user');
  }
};

export const signInUser = async ({ email, password }) => {
  try {
    const url = `${SERVER_API}api/signin`;

    const body = JSON.stringify({
      email,
      password,
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body,
    });

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('SIGN IN ERROR', error.message);
    throw new Error('Unexpected error, failed to sign in user');
  }
};
