export default {
  formId: 'sign_in_form',
  fields: {
    email: {
      name: 'email',
      label: 'E-mail',
      placeholder: 'Enter your e-mail',
      requiredErrorMsg: 'A valid email is required',
      validEmailMsg: 'A valid email is required',
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
