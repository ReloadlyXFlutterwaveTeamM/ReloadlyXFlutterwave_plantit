import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { doc, setDoc, getDoc } from 'firebase/firestore';

import { DB, AUTH } from '../firebase';

export const signUpUser = async (values) => {
  try {
    const { email, password, name, terms, phone } = values;
    const response = await createUserWithEmailAndPassword(AUTH, email, password);
    const {
      user: { uid },
    } = response;

    await setDoc(doc(DB, 'users', uid), {
      uid,
      email,
      name,
      phone,
      terms,
    });

    return { message: 'Your account has been successfully created' };
  } catch (err) {
    window.console.error('REGISTRATION ERROR', err.message);
    throw new Error('Error registering the user');
  }
};

export const signInUser = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(AUTH, email, password);

    const {
      user: { uid },
    } = response || {};

    const docRef = doc(DB, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data();
      return { user, message: 'You have been successfully logged in' };
    }
    throw new Error('Your account does not exist');
  } catch (err) {
    window.console.error('SIGNING IN ERROR', err.message);
    throw new Error('Error signing in the user');
  }
};

export const checkUserStatus = async (handleUser) => {
  try {
    const user = AUTH.currentUser;

    if (user) {
      const { uid } = user;

      const docRef = doc(DB, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        handleUser(docSnap.data());
      } else {
        throw new Error('Your account does not exist');
      }
    } else {
      throw new Error('You need to first authenticate');
    }
  } catch (err) {
    window.console.error('AUTH STATUS ERROR', err.message);
    throw new Error('Error retrieving user status');
  }
};

export const signOutUser = async () => {
  try {
    await signOut(AUTH);
    return { message: 'Successfully logged out user' };
  } catch (err) {
    window.console.error('SIGN OUT ERROR', err.message);
    throw new Error('Error signing out user');
  }
};
