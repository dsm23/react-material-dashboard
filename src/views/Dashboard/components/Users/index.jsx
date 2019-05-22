import React from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';

// Shared components
import Paper from 'components/Paper';

// Component styles
import styles from './styles';

const Users = ({ classes, className, ...rest }) => {
  const rootClassName = classNames(classes.root, className);

  return (
    <Paper {...rest} className={rootClassName}>
      <div className={classes.content}>
        <Typography className={classes.title} variant="body2">
          TOTAL USERS
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">1600</Typography>
          <Typography className={classes.difference} variant="body2">
            <ArrowDropDownIcon />
            16%
          </Typography>
        </div>
      </div>
      <div className={classes.iconWrapper}>
        <PeopleOutlinedIcon className={classes.icon} />
      </div>
    </Paper>
  );
};

Users.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
