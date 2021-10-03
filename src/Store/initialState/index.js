export const authInitialState = {
  user: {
    id: '',
    name: '',
    phone: '',
    email: '',
  },
  token: '',
  total_points: 0,
  redeemable_points: 0,
  number_of_trees: 0,
  total_locations: 0,
  locations: [],
};

export const alertInitialState = {
  message: '',
  show: false,
  variant: 'success',
};
