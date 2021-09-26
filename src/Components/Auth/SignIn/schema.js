import * as Yup from 'yup';

import model from './model';

const { fields } = model;
const { contact, password } = fields;

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const phoneRegex = /^[0-9]{10}$/;

const initialValues = {
  [contact.name]: '',
  [password.name]: '',
};

function validateContact(value) {
  const isValidEmail = emailRegex.test(value);
  const isValidPhone = phoneRegex.test(value);

  if (!isValidEmail && !isValidPhone) {
    return false;
  }
  return true;
}

const validation = Yup.object().shape({
  [contact.name]: Yup.string()
    .test('validate_contact', contact.requiredErrorMsg, validateContact)
    .required(contact.requiredErrorMsg),
  [password.name]: Yup.string().min(8, password.minErrorMsg).required(password.requiredErrorMsg),
});

export { initialValues, validation };
