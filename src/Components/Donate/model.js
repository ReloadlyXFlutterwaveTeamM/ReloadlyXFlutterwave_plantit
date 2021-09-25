export default {
  formId: 'donate_form',
  fields: {
    number_of_trees: {
      name: 'number_of_trees',
      label: 'How many trees do you want to plant?',
      placeholder: 'Choose a number',
      requiredErrorMsg: 'At least one tree is required',
    },
    planting_area: {
      name: 'planting_area',
      label: 'Where do you want to plant them?',
      placeholder: 'Choose one or more',
      requiredErrorMsg: 'A selection is required',
    },
    tree_type: {
      name: 'tree_type',
      label: 'Type of tree',
      placeholder: 'Choose one or more',
      requiredErrorMsg: 'A selection is required',
    },
  },
};
