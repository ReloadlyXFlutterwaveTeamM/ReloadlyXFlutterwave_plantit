import { sendAirtimeTopUps, getOperatorDetails, getAirtimeAccessToken } from './Airtime';
import { orderGiftCards, getAllGiftCardProducts, getGiftCardAccessToken } from './GiftCards';
import { registerUser, logInUser, logOutUser, getSanctumToken, checkLoginStatus } from './Auth';
import { saveDonation, saveTransaction, getDonations, updateDonation } from './Transactions';
import { signInUser, signUpUser, checkUserStatus, signOutUser } from './Authentication';

export {
  // AUTHENTICATION APIs -firebase
  signInUser,
  signUpUser,
  checkUserStatus,
  signOutUser,
  // DONATIONS CRUD - sanctum
  getDonations,
  saveDonation,
  updateDonation,
  saveTransaction,
  // RELOADLY PRODUCTS
  sendAirtimeTopUps,
  getOperatorDetails,
  getAirtimeAccessToken,
  orderGiftCards,
  // RELOADLY ACCESS TOKENS
  getAllGiftCardProducts,
  getGiftCardAccessToken,
  // AUTHENTICATION APIs -Sanctum
  getSanctumToken,
  logInUser,
  logOutUser,
  registerUser,
  checkLoginStatus,
};
export { default as getNewsArticles } from './Articles';
