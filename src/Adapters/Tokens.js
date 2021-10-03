import { API } from 'Utils';

export const getAirtimeAccessToken = async (token) => {
  try {
    const res = await API({
      method: 'GET',
      url: 'api/reloadly_airtime_access_token',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const {
      data: { access_token },
    } = res || {};

    return { access_token, message: 'Access token successfully retrieved' };
  } catch (error) {
    window.console.error('GET AIRTIME ACCESS TOKEN ERROR', error.message);
    throw new Error('Failed to retrieve airtime access token');
  }
};

export const getGiftsCardAccessToken = async (token) => {
  try {
    const res = await API({
      method: 'GET',
      url: 'api/reloadly_giftcard_access_token',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const {
      data: { access_token },
    } = res || {};

    return { access_token, message: 'Access token successfully retrieved' };
  } catch (error) {
    window.console.error('GET GIFT CARDS ACCESS TOKEN ERROR', error.message);
    throw new Error('Failed to retrieve gift card access token');
  }
};
