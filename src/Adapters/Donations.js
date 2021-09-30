import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';

import { DB } from '../firebase';

export const saveDonation = async (donation) => {
  try {
    console.log('donation II', donation);
    const { donation_id } = donation;
    await setDoc(doc(DB, 'donations', donation_id), {
      ...donation,
    });
  } catch (error) {
    window.console.error('SAVE DONATIONS ERROR', error.message);
    throw new Error('Error saving donations');
  }
};

export const saveTransaction = async (transaction) => {
  try {
    console.log('transaction II', transaction);
    const { transaction_id } = transaction;
    await setDoc(doc(DB, 'transactions', transaction_id), {
      ...transaction,
    });
  } catch (error) {
    window.console.error('SAVE TRANSACTIONS ERROR', error.message);
    throw new Error('Error saving transactions');
  }
};

export const getDonations = async (user_id) => {
  try {
    const donations = [];
    const q = query(collection(DB, 'donations'), where('uid', '==', user_id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((donation) => {
      donations.push(donation.data());
    });

    return { donations, message: 'Successfully retrieved donations' };
  } catch (error) {
    window.console.error('GET DONATIONS ERROR', error.message);
    throw new Error('Error retrieving donations');
  }
};
