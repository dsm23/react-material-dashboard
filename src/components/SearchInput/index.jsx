import React from 'react';

// Externals
import PropTypes from 'prop-types';
import cn from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';

// Component styles
import styles from './styles';

const SearchInput = ({ classes, className, onChange, ...rest }) => {
  const rootClassName = cn(classes.root, className);

  return (
    <div className={rootClassName}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={onChange}
      />
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

SearchInput.defaultProps = {
  onChange: () => {},
};

export default withStyles(styles)(SearchInput);
