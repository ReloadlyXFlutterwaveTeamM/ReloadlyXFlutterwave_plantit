export default {
  formId: 'sign_in_form',
  fields: {
    name: {
      name: 'name',
      label: 'Full Name',
      placeholder: 'Enter your name',
      requiredErrorMsg: 'A full name is required',
      minErrorMsg: 'A minimum of 3 characters is required',
    },
    email: {
      name: 'email',
      label: 'E-mail',
      placeholder: 'Type your e-mail',
      requiredErrorMsg: 'A valid email is required',
      validEmailMsg: 'A valid email is required',
    },
    phone_number: {
      name: 'phone',
      label: 'Phone number',
      placeholder: 'Type your phone number',
      requiredErrorMsg: 'A valid phone number is required',
      validPhoneMsg: 'A valid 10 or 11 digit phone number is required',
    },
    password: {
      name: 'password',
      label: 'Password',
      placeholder: 'Type your password',
      requiredErrorMsg: 'A password is required',
      validPasswordMsg: 'A valid password is required',
      minErrorMsg: 'A minimum of 8 characters is required',
    },
    terms: {
      name: 'terms',
      requiredErrorMsg: 'You need to agree to the terms and conditions',
    },
  },
};
