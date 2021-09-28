import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';

import { DB } from '../firebase';

export const saveDonation = async (donation) => {
  try {
    const { id } = donation;
    await setDoc(doc(DB, 'donations', id), {
      ...donation,
    });
  } catch (error) {
    window.console.error('SAVE DONATIONS ERROR', error.message);
    throw new Error('Error saving donations');
  }
};

export const saveTransaction = async (transaction) => {
  try {
    const { id } = transaction;
    await setDoc(doc(DB, 'donations', id), {
      ...transaction,
    });
  } catch (error) {
    window.console.error('GET TRANSACTIONS ERROR', error.message);
    throw new Error('Error retrieving transactions');
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
