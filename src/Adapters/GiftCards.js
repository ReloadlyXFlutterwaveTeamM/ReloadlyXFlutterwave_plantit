const CLIENT_ID = process.env.REACT_APP_RELOADLY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_RELOADLY_CLIENT_SECRET;

// const audience =
//   process.env.NODE_ENV === 'development'
//     ? 'https://giftcards-sandbox.reloadly.com'
//     : 'https://giftcards.reloadly.com';

const audience = 'https://giftcards.reloadly.com';

export const orderGiftCards = async (access_token, reference, product, recipient) => {
  try {
    const { productId, fixedRecipientDenominations } = product || {};
    const { recipient_name, recipient_email, recipient_country_code = 'NG' } = recipient || {};

    const url = `${audience}/orders`;

    const body = JSON.stringify({
      productId,
      countryCode: recipient_country_code,
      quantity: 1,
      unitPrice: fixedRecipientDenominations[0],
      customIdentifier: reference,
      senderName: `PLANTIT-${recipient_name}`,
      recipientEmail: recipient_email,
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/com.reloadly.giftcards-v1+json',
      },
      body,
    });

    if (res.status === 400) {
      throw new Error('Sorry, you cannot order this product at the moment.');
    }

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('ORDER GIFT CARD ERROR', error.message);
    throw new Error(error.message || 'Failed to order gift card');
  }
};

export const getAllGiftCardProducts = async (access_token, countryCode = 'NG') => {
  try {
    const url = `${audience}/products?countryCode=${countryCode}&includeRange=false&includeFixed=true`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${access_token}`,
        Accept: 'application/com.reloadly.giftcards-v1+json',
      },
    });

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('GET GIFT CARD PRODUCTS ERROR', error.message);
    throw new Error(error.message || 'Failed to order gift card');
  }
};

export const getGiftCardAccessToken = async () => {
  try {
    const url = 'https://cors.bridged.cc/https://auth.reloadly.com/oauth/token';

    const body = JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
      audience,
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('GET ACCESS TOKEN ERROR', error.message);
    throw new Error('Failed to retrieve access token');
  }
};
