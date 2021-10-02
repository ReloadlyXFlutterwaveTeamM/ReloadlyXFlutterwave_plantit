const SERVER_API = process.env.REACT_APP_SERVER_API;

export const getAirtimeAccessToken = async () => {
  try {
    const url = `${SERVER_API}api/reloadly_airtime_access_token`;

    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('GET AIRTIME ACCESS TOKEN ERROR', error.message);
    throw new Error('Failed to retrieve airtime access token');
  }
};

export const getGiftsCardToken = async () => {
  try {
    const url = `${SERVER_API}api/reloadly_giftcard_access_token`;

    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('GET GIFT CARDS ACCESS TOKEN ERROR', error.message);
    throw new Error('Failed to retrieve gift card access token');
  }
};
