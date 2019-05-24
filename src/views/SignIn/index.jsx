import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

// Material helpers
import { withStyles } from '@material-ui/core/styles/index';

// Material components
import Grid from '@material-ui/core/Grid/index';
import Button from '@material-ui/core/Button/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import IconButton from '@material-ui/core/IconButton/index';
import Typography from '@material-ui/core/Typography/index';

import { TextField } from 'final-form-material-ui';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Form, Field } from 'react-final-form';

import { required } from 'common/validators';

// Shared components
import FacebookIcon from 'icons/Facebook';
import GoogleIcon from 'icons/Google';

// Component styles
import styles from './styles';

// Service methods
const signIn = () =>
  new Promise(resolve => {
    setTimeout(resolve, 1500);
  });

const SignIn = ({ classes, history }) => {
  const handleBack = () => {
    history.goBack();
  };

  const handleSignIn = async values => {
    try {
      await signIn(values.email, values.password);

      localStorage.setItem('isAuthenticated', true);

      history.push('/dashboard');
    } catch (error) {
      return error;
    }
  };

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
              <IconButton className={classes.backButton} onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <Form onSubmit={handleSignIn}>
                {({
                  values,
                  handleSubmit,
                  invalid,
                  submitting,
                  submitError,
                  submitFailed,
                  hasSubmitErrors,
                }) => (
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <Typography className={classes.title} variant="h2">
                      Sign in
                    </Typography>
                    <Typography className={classes.subtitle} variant="body1">
                      Sign in with social media
                    </Typography>
                    <Button
                      className={classes.facebookButton}
                      color="primary"
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <FacebookIcon className={classes.facebookIcon} />
                      Login with Facebook (not currently working)
                    </Button>
                    <Button
                      className={classes.googleButton}
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <GoogleIcon className={classes.googleIcon} />
                      Login with Google (not currently working)
                    </Button>
                    <Typography className={classes.sugestion} variant="body1">
                      or login with email address
                    </Typography>
                    <div className={classes.fields}>
                      <Field
                        className={classes.textField}
                        component={TextField}
                        label="Email address"
                        name="email"
                        type="text"
                        variant="outlined"
                        required
                        validate={required('Email address is required')}
                      />
                      <Field
                        className={classes.textField}
                        component={TextField}
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        required
                        validate={required('Password is required')}
                      />
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
                        className={classes.signInButton}
                        color="primary"
                        disabled={invalid}
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Sign in now
                      </Button>
                    )}
                    <Typography className={classes.signUp} variant="body1">
                      Don't have an account?{' '}
                      <Link className={classes.signUpUrl} to="/sign-up">
                        Sign up
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
};

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withStyles(styles),
)(SignIn);
