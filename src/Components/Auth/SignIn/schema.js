import * as Yup from 'yup';

import model from './model';

const { fields } = model;
const { email, password } = fields;

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const initialValues = {
  [email.name]: '',
  [password.name]: '',
};

function validateEmail(value) {
  const isValidEmail = emailRegex.test(value);

  if (!isValidEmail) {
    return false;
  }
  return true;
}

const validation = Yup.object().shape({
  [email.name]: Yup.string()
    .test('validate_contact', email.requiredErrorMsg, validateEmail)
    .required(email.requiredErrorMsg),
  [password.name]: Yup.string().min(8, password.minErrorMsg).required(password.requiredErrorMsg),
});

export { initialValues, validation };
