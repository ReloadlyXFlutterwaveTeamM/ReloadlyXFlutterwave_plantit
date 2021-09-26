export default {
  formId: 'sign_in_form',
  fields: {
    contact: {
      name: 'contact',
      label: 'E-mail or phone number',
      placeholder: 'Type your e-mail or phone number',
      requiredErrorMsg: 'A valid email or phone number is required',
      validEmailMsg: 'A valid email is required',
      validPhoneMsg: 'A valid phone number is required',
    },
    password: {
      name: 'password',
      label: 'Password',
      placeholder: 'Type your password',
      requiredErrorMsg: 'A password is required',
      validPasswordMsg: 'A valid password is required',
      minErrorMsg: 'A minimum of 8 characters is required',
    },
  },
};
