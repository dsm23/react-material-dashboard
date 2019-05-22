import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import { Checkbox } from 'final-form-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Form, Field } from 'react-final-form';

// Shared components
import Portlet from 'components/Portlet';
import PortletHeader from 'components/PortletHeader';
import PortletLabel from 'components/PortletLabel';
import PortletContent from 'components/PortletContent';
import PortletFooter from 'components/PortletFooter';

// Component styles
import styles from './styles';

const notifications = 'notifications';

const messages = 'messages';

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Notifications = ({ classes, className, ...rest }) => {
  const rootClassName = classNames(classes.root, className);

  return (
    <Portlet {...rest} className={rootClassName}>
      <PortletHeader>
        <PortletLabel
          subtitle="Manage the notifications"
          title="Notifications"
        />
      </PortletHeader>
      <PortletContent noPadding>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            [notifications]: ['push', 'messages', 'calls'],
            [messages]: ['push', 'calls'],
          }}
        >
          {({ values, handleSubmit }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.group}>
                <Typography className={classes.groupLabel} variant="h6">
                  Notifications
                </Typography>
                <div className={classes.field}>
                  <Field
                    name={notifications}
                    component={Checkbox}
                    type="checkbox"
                    value="email"
                    color="primary"
                  />
                  <div>
                    <Typography variant="body1">Email</Typography>
                  </div>
                </div>
                <div className={classes.field}>
                  <Field
                    name={notifications}
                    component={Checkbox}
                    type="checkbox"
                    value="push"
                    color="primary"
                  />
                  <div>
                    <Typography variant="body1">Push Notifications</Typography>
                    <Typography variant="caption">
                      For your mobile or tablet device
                    </Typography>
                  </div>
                </div>
                <div className={classes.field}>
                  <Field
                    name={notifications}
                    component={Checkbox}
                    type="checkbox"
                    value="messages"
                    color="primary"
                  />
                  <div>
                    <Typography variant="body1">Text Messages</Typography>
                  </div>
                </div>
                <div className={classes.field}>
                  <Field
                    name={notifications}
                    component={Checkbox}
                    type="checkbox"
                    value="calls"
                    color="primary"
                  />
                  <div>
                    <Typography variant="body1">Phone calls</Typography>
                  </div>
                </div>
              </div>
              <div className={classes.group}>
                <Typography className={classes.groupLabel} variant="h6">
                  Messages
                </Typography>
                <div className={classes.field}>
                  <Field
                    name={messages}
                    component={Checkbox}
                    type="checkbox"
                    value="email"
                    color="primary"
                  />
                  <div>
                    <Typography variant="body1">Email</Typography>
                  </div>
                </div>
                <div className={classes.field}>
                  <Field
                    name={messages}
                    component={Checkbox}
                    type="checkbox"
                    value="push"
                    color="primary"
                  />
                  <div>
                    <Typography variant="body1">Push Notifications</Typography>
                  </div>
                </div>
                <div className={classes.field}>
                  <Field
                    name={messages}
                    component={Checkbox}
                    type="checkbox"
                    value="calls"
                    color="primary"
                  />
                  <div>
                    <Typography variant="body1">Phone calls</Typography>
                  </div>
                </div>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <pre>{JSON.stringify(values, null, 2)}</pre>
              )}
            </form>
          )}
        </Form>
      </PortletContent>
      <PortletFooter className={classes.portletFooter}>
        <Button color="primary" variant="outlined">
          Save
        </Button>
      </PortletFooter>
    </Portlet>
  );
};

Notifications.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);
