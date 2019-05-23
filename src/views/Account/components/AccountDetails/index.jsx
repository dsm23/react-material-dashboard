import React from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

import { Form, Field } from 'react-final-form';

// Material components
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

import { TextField } from 'final-form-material-ui';

// Shared components
import Portlet from 'components/Portlet';
import PortletHeader from 'components/PortletHeader';
import PortletLabel from 'components/PortletLabel';
import PortletContent from 'components/PortletContent';
import PortletFooter from 'components/PortletFooter';

// Component styles
import styles from './styles';

const states = [
  {
    value: 'alabama',
    label: 'Alabama',
  },
  {
    value: 'new-york',
    label: 'New York',
  },
  {
    value: 'san-francisco',
    label: 'San Francisco',
  },
];

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Account = ({ classes, className, ...rest }) => {
  const rootClassName = classNames(classes.root, className);

  return (
    <Portlet {...rest} className={rootClassName}>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          firstName: 'John',
          lastName: 'Doe',
          email: 'contact@devias.io',
          phone: '',
          state: 'Alabama',
          country: 'USA',
        }}
      >
        {({ values, handleSubmit }) => (
          <form autoComplete="off" onSubmit={handleSubmit} noValidate>
            <PortletHeader>
              <PortletLabel
                subtitle="The information can be edited"
                title="Profile"
              />
            </PortletHeader>
            <PortletContent noPadding>
              <div className={classes.field}>
                <Field
                  name="firstName"
                  component={TextField}
                  className={classes.textField}
                  helperText="Please specify the first name"
                  label="First name"
                  margin="dense"
                  required
                  variant="outlined"
                />
                <Field
                  name="lastName"
                  component={TextField}
                  className={classes.textField}
                  label="Last name"
                  margin="dense"
                  required
                  variant="outlined"
                />
              </div>
              <div className={classes.field}>
                <Field
                  name="email"
                  component={TextField}
                  className={classes.textField}
                  label="Email Address"
                  margin="dense"
                  required
                  variant="outlined"
                />
                <Field
                  name="phone"
                  component={TextField}
                  className={classes.textField}
                  label="Phone Number"
                  margin="dense"
                  type="number"
                  variant="outlined"
                />
              </div>
              <div className={classes.field}>
                <Field
                  name="state"
                  component={TextField}
                  className={classes.textField}
                  label="Select State"
                  margin="dense"
                  required
                  select
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                >
                  {states.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <Field
                  name="country"
                  component={TextField}
                  className={classes.textField}
                  label="Country"
                  margin="dense"
                  required
                  variant="outlined"
                />
              </div>
              {process.env.NODE_ENV === 'development' && (
                <pre>{JSON.stringify(values, null, 2)}</pre>
              )}
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            </PortletFooter>
          </form>
        )}
      </Form>
    </Portlet>
  );
};

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
