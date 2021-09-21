export default {
  formId: 'sign_in_form',
  fields: {
    fullname: {
      name: 'fullname',
      label: 'Full Name',
      placeholder: 'Enter your name',
      requiredErrorMsg: 'A full name is required',
    },
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
    },
    agree: {
      name: 'agree',
      requiredErrorMsg: 'You need to agree to the terms and conditions',
    },
  },
};
