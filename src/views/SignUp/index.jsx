import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

// Material helpers
import { withStyles } from '@material-ui/core/styles/index';

// Material components
import Button from '@material-ui/core/Button/index';
// import Checkbox from '@material-ui/core/Checkbox/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import Grid from '@material-ui/core/Grid/index';
import IconButton from '@material-ui/core/IconButton/index';
// import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography/index';

import { Checkbox, TextField } from 'final-form-material-ui';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Form, Field } from 'react-final-form';

// Shared utilities
import { required } from 'common/validators';

// Component styles
import styles from './styles';

// Service methods
const signUp = () => new Promise(resolve => setTimeout(resolve, 1500));

class SignUp extends Component {
  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  handleSignUp = async values => {
    try {
      const { history } = this.props;

      await signUp({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      history.push('/sign-in');
    } catch (error) {
      return error;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                  they sold out High Life.
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Takamaru Ayako
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    Manager at inVision
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <Form onSubmit={this.handleSignUp}>
                  {({
                    values,
                    submitting,
                    handleSubmit,
                    submitError,
                    invalid,
                    submitFailed,
                    hasSubmitErrors,
                  }) => (
                    <form className={classes.form} onSubmit={handleSubmit}>
                      <Typography className={classes.title} variant="h2">
                        Create new account
                      </Typography>
                      <Typography className={classes.subtitle} variant="body1">
                        Use your work email to create new account... it's free.
                      </Typography>
                      <div className={classes.fields}>
                        <Field
                          className={classes.textField}
                          component={TextField}
                          label="First name"
                          name="firstName"
                          variant="outlined"
                          required
                          validate={required('First name is Required')}
                        />
                        <Field
                          className={classes.textField}
                          component={TextField}
                          label="Last name"
                          name="lastName"
                          variant="outlined"
                          required
                          validate={required('Last name is Required')}
                        />
                        <Field
                          className={classes.textField}
                          component={TextField}
                          label="Email address"
                          name="email"
                          variant="outlined"
                          required
                          validate={required('Email address is Required')}
                        />
                        <Field
                          className={classes.textField}
                          component={TextField}
                          label="Password"
                          name="password"
                          type="password"
                          variant="outlined"
                          required
                          validate={required('Password is Required')}
                        />
                        <div className={classes.policy}>
                          <Field
                            component={Checkbox}
                            className={classes.policyCheckbox}
                            color="primary"
                            name="policy"
                            required
                            type="checkbox"
                            validate={required()}
                          />
                          <Typography
                            className={classes.policyText}
                            variant="body1"
                          >
                            I have read the &nbsp;
                            <Link className={classes.policyUrl} to="#">
                              Terms and Conditions
                            </Link>
                            .
                          </Typography>
                        </div>
                      </div>
                      {submitFailed && hasSubmitErrors && (
                        <Typography
                          className={classes.submitError}
                          variant="body2"
                        >
                          {submitError}
                        </Typography>
                      )}
                      {submitting ? (
                        <CircularProgress className={classes.progress} />
                      ) : (
                        <Button
                          className={classes.signUpButton}
                          color="primary"
                          disabled={invalid}
                          onClick={this.handleSignUp}
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Sign up now
                        </Button>
                      )}
                      <Typography className={classes.signIn} variant="body1">
                        Have an account?{' '}
                        <Link className={classes.signInUrl} to="/sign-in">
                          Sign In
                        </Link>
                      </Typography>
                      {process.env.NODE_ENV === 'development' && (
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                      )}
                    </form>
                  )}
                </Form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withStyles(styles),
)(SignUp);
