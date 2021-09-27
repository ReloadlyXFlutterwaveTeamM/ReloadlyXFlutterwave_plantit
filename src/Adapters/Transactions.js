const SERVER_API = process.env.REACT_APP_SERVER_API;

export const saveTransactionDetails = async (user_id, transaction) => {
  try {
    const url = `${SERVER_API}transactions`;

    const body = JSON.stringify({
      ...transaction,
      user_id,
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
    window.console.error('SAVE TRANSCATION DETAILS ERROR', error.message);
    throw new Error('Failed to save transaction details');
  }
};

export const getTransactionDetails = async (user_id) => {
  try {
    const url = `${SERVER_API}transactions/${user_id}`;

    const res = await fetch(url, {
      method: 'GET',
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
    window.console.error('GET TRANSCATION DETAILS ERROR', error.message);
    throw new Error('Failed to get transaction details');
  }
};
