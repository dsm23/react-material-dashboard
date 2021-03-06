import React from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Shared layouts
import DashboardLayout from 'layouts/Dashboard';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
  },
  iframe: {
    width: '100%',
    minHeight: '600px',
    border: 0,
  },
});

const Icons = ({ classes }) => (
  <DashboardLayout title="Icons">
    <div className={classes.root}>
      <iframe
        className={classes.iframe}
        src="https://material.io/tools/icons/?icon=accessibility&style=outline"
        title="Material Design icons"
      />
    </div>
  </DashboardLayout>
);

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Icons);
