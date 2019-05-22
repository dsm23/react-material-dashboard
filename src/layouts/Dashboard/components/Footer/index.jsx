import React from 'react';

// Externals
import PropTypes from 'prop-types';
import cn from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
  },
  company: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 0.5,
  },
});

const Footer = ({ classes, className }) => {
  const rootClassName = cn(classes.root, className);

  return (
    <div className={rootClassName}>
      <Divider />
      <Typography className={classes.company} variant="body1">
        &copy; Devias Io. 2019
      </Typography>
      <Typography variant="caption">
        Created with love for the environment. By designers and developers who
        love to work together in offices!
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
