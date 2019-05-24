import React from 'react';

// Externals
import PropTypes from 'prop-types';
import cn from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
//import TextField from '@material-ui/core/TextField/index';
import Button from '@material-ui/core/Button';
import { TextField } from 'final-form-material-ui';

import { Form, Field } from 'react-final-form';

// Shared components
import Portlet from 'components/Portlet';
import PortletHeader from 'components/PortletHeader';
import PortletLabel from 'components/PortletLabel';
import PortletContent from 'components/PortletContent';
import PortletFooter from 'components/PortletFooter';

import { required } from 'common/validators';

// Component styles
import styles from './styles';

const validate = values => {
  const errors = {};
  if (values.password !== values.confirm) {
    errors.confirm = 'Two fields must match';
  }
  return errors;
};

const Password = ({ classes, className, ...rest }) => {
  const rootClassName = cn(classes.root, className);

  return (
    <Portlet {...rest} className={rootClassName}>
      <Form onSubmit={() => {}} validate={validate}>
        {({ values, handleSubmit }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <PortletHeader>
              <PortletLabel subtitle="Update password" title="Password" />
            </PortletHeader>
            <PortletContent>
              <Field
                className={classes.textField}
                component={TextField}
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                validate={required()}
                required
              />
              <Field
                className={classes.textField}
                component={TextField}
                label="Confirm password"
                name="confirm"
                type="password"
                variant="outlined"
                validate={required()}
                required
              />
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>
              <Button color="primary" variant="outlined" type="submit">
                Update
              </Button>
            </PortletFooter>
            {process.env.NODE_ENV === 'development' && (
              <pre>{JSON.stringify(values, null, 2)}</pre>
            )}
          </form>
        )}
      </Form>
    </Portlet>
  );
};

Password.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Password);
