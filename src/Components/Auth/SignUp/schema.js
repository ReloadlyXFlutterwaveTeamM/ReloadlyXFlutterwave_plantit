import * as Yup from 'yup';

import model from './model';

const { fields } = model;
const { email, phone_number, password, name, terms } = fields;

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const phoneRegex = /^[0-9]{10}$/;

const initialValues = {
  [password.name]: '',
  [name.name]: '',
  [terms.name]: true,
  [email.name]: '',
  [phone_number.name]: '',
};

function validateEmail(value) {
  const isValidEmail = emailRegex.test(value);

  if (!isValidEmail) {
    return false;
  }
  return true;
}

function validatePhone(value) {
  const isValidPhone = phoneRegex.test(value);

  if (!isValidPhone) {
    return false;
  }
  return true;
}

const validation = Yup.object().shape({
  [email.name]: Yup.string()
    .test('validate_email', email.requiredErrorMsg, validateEmail)
    .required(email.requiredErrorMsg),
  [phone_number.name]: Yup.string()
    .test('validate_phone', phone_number.requiredErrorMsg, validatePhone)
    .required(phone_number.requiredErrorMsg),
  [password.name]: Yup.string().min(8, password.minErrorMsg).required(password.requiredErrorMsg),
  [name.name]: Yup.string().min(3, name.minErrorMsg).required(name.requiredErrorMsg),
  [terms.name]: Yup.boolean()
    .oneOf([true], terms.requiredErrorMsg)
    .required(terms.requiredErrorMsg),
});

export { initialValues, validation };
