const CLIENT_ID = '';
const CLIENT_SECRET = '';

const SENDER_CONTACT = '08172599639';
const SENDER_COUNTRY_CODE = 'NG';

// const audience =
//   process.env.NODE_ENV === 'development'
//     ? 'https://topups-sandbox.reloadly.com'
//     : 'https://topups.reloadly.com';

const audience = 'https://topups.reloadly.com';

/**
 * Verify and get the operator details from the user phone number
 * @name getOperatorDetails
 *
 * @param {string} access_token
 * @param {Object} recipient
 * @param {string} recipient.recipient_contact
 * @param {string} recipient.recipient_country_code
 *
 */
export const getOperatorDetails = async (
  access_token,
  { recipient_contact, recipient_country_code = 'NG' },
) => {
  try {
    const url = `${audience}/operators/auto-detect/phone/${recipient_contact}/countries/${recipient_country_code}?suggestedAmountsMap=true&SuggestedAmounts=true`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${access_token}`,
        Accept: 'application/com.reloadly.topups-v1+json',
      },
    });

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('GET OPERATOR DETAILS', error.message);
    throw new Error('Failed to retrieve operator details');
  }
};

/**
 * Send Airtime Top ups to the recipient
 * @name sendAirtimeTopUps
 *
 * @param {string} access_token
 * @param {string} reference
 * @param {number} amount
 * @param {Object} recipient
 * @param {string} recipient.operatorId
 * @param {string} recipient.recipient_contact
 * @param {string} recipient.recipient_country_code
 *
 */
export const sendAirtimeTopUps = async (
  access_token,
  reference,
  amount,
  { operatorId, recipient_contact, recipient_country_code = 'NG' },
) => {
  try {
    const url = `${audience}/topups`;
    const NAIRA_EXCHANGE_RATE = 400;

    const body = JSON.stringify({
      operatorId,
      amount: amount * NAIRA_EXCHANGE_RATE,
      useLocalAmount: true,
      customIdentifier: reference,
      recipientPhone: {
        countryCode: recipient_country_code,
        number: recipient_contact,
      },
      senderPhone: {
        countryCode: SENDER_COUNTRY_CODE || 'NG',
        number: SENDER_CONTACT,
      },
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/com.reloadly.topups-v1+json',
        'Content-Type': 'application/json',
      },
      body,
    });

    if (res.status === 400) {
      const response = await res.json();
      throw new Error(response.message);
    }

    if (!res.ok) {
      throw new Error('Unexpected Network Error');
    }

    const response = await res.json();
    return response;
  } catch (error) {
    window.console.error('SEND AIRTIME TOP UPS ERROR', error.message);
    throw new Error(error.message || 'Failed to send airtime top ups');
  }
};

export const getAirtimeAccessToken = async () => {
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
