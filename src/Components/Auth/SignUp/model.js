export default {
  formId: 'sign_in_form',
  fields: {
    fullname: {
      name: 'fullname',
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
      name: 'phone_number',
      label: 'Phone number',
      placeholder: 'Type your phone number',
      requiredErrorMsg: 'A valid phone number is required',
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
    agree: {
      name: 'agree',
      requiredErrorMsg: 'You need to agree to the terms and conditions',
    },
  },
};
