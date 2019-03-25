import { dispatched } from '@webkom/react-prepare';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import UserConfirmation from './components/UserConfirmation';
import { createUser, validateRegistrationToken } from 'app/actions/UserActions';

const loadData = (
  {
    location: {
      query: { token }
    }
  },
  dispatch
) => {
  if (token) {
    return dispatch(validateRegistrationToken(token));
  }
};

const mapStateToProps = (state, props) => {
  const valueSelector = formValueSelector('ConfirmationForm');
  return {
    token: state.auth.registrationToken,
    user: {
      username: valueSelector(state, 'username'),
      firstName: valueSelector(state, 'firstName'),
      lastName: valueSelector(state, 'lastName'),
      allergies: valueSelector(state, 'allergies')
    }
  };
};

const mapDispatchToProps = {
  createUser
};

export default compose(
  dispatched(loadData, { componentWillReceiveProps: false }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserConfirmation);
