import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { doc, setDoc, getDoc } from 'firebase/firestore';

import { DB, AUTH } from '../firebase';

export const signUpUser = async (values) => {
  try {
    const { email, password, name, terms, phone } = values;
    const response = await createUserWithEmailAndPassword(AUTH, email, password);
    const {
      user: { uid: id },
    } = response;

    await setDoc(doc(DB, 'users', id), {
      id,
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
      user: { uid: id },
    } = response || {};

    const docRef = doc(DB, 'users', id);
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

export const checkUserStatus = async (handleUser, handleNoUser) => {
  try {
    onAuthStateChanged(AUTH, async (user) => {
      if (user) {
        const { uid: id } = user;

        const docRef = doc(DB, 'users', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          handleUser({ user: docSnap.data() });
        }
      } else {
        handleNoUser();
      }
    });
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
