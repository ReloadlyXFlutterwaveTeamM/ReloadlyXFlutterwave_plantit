import { API } from 'Utils';

export const saveDonation = async (token, transaction, donation) => {
  try {
    await API({
      method: 'POST',
      url: '/api/donation',
      data: { ...transaction, ...donation },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { message: 'Successfully saved the donation' };
  } catch (error) {
    window.console.error('SAVE DONATIONS ERROR', error.message);
    throw new Error('Error saving donations');
  }
};

export const saveTransaction = async (token, transaction) => {
  try {
    await API({
      method: 'POST',
      url: '/api/transactions',
      data: transaction,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { message: 'Successfully saved the transaction' };
  } catch (error) {
    window.console.error('SAVE TRANSACTIONS ERROR', error.message);
    throw new Error('Error saving transactions');
  }
};

export const getDonations = async (user_id, token) => {
  try {
    const res = await API({
      method: 'GET',
      url: `/api/donation/${user_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = res;
    return { donations: data, message: 'Successfully retrieved donations' };
  } catch (error) {
    window.console.error('GET DONATIONS ERROR', error.message);
    throw new Error('Error retrieving donations');
  }
};

export const updateDonation = async (donation) => {
  try {
    window.console.log('Donation', donation);
  } catch (error) {
    window.console.error('UPDATE DONATIONS ERROR', error.message);
    throw new Error('Error updating donations');
  }
};
