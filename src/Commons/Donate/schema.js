import * as Yup from 'yup';

import model from './model';

const { fields } = model;
const { number_of_trees, tree_type, planting_area } = fields;

const initialValues = {
  [planting_area.name]: '',
  [number_of_trees.name]: 0,
  [tree_type.name]: '',
};

const validation = Yup.object().shape({
  [tree_type.name]: Yup.string().required(tree_type.requiredErrorMsg),
  [planting_area.name]: Yup.string().required(planting_area.requiredErrorMsg),
  [number_of_trees.name]: Yup.number()
    .min(1, number_of_trees.requiredErrorMsg)
    .required(number_of_trees.requiredErrorMsg),
});

export { initialValues, validation };
