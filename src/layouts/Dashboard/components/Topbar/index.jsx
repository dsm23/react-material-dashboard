import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SignoutIcon from '@material-ui/icons/ExitToAppOutlined';

// Shared services
import { getNotifications } from 'services/notification';

// Custom components
import NotificationList from './components/NotificationList';

// Component styles
import styles from './styles';

const Topbar = ({
  classes,
  className,
  history,
  title,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const signal = useRef(true);

  const [state, setState] = useState({
    notifications: [],
    notificationsLimit: 4,
    notificationsCount: 0,
    notificationsEl: null,
  });

  const { notificationsLimit } = state;

  const makeFetch = useCallback(async notificationsLimit => {
    try {
      const { notifications, notificationsCount } = await getNotifications(
        notificationsLimit,
      );

      if (signal.current) {
        setState(state => ({
          ...state,
          notifications,
          notificationsCount,
        }));
      }
    } catch (error) {
      return;
    }
  }, []);

  useEffect(() => {
    signal.current = true;
    makeFetch(notificationsLimit);
    return () => {
      signal.current = false;
    };
  }, [makeFetch, notificationsLimit]);

  const handleSignOut = () => {
    localStorage.setItem('isAuthenticated', false);
    history.push('/sign-in');
  };

  const handleShowNotifications = e => {
    setState(state => ({
      ...state,
      notificationsEl: e.currentTarget,
    }));
  };

  const handleCloseNotifications = () => {
    setState(state => ({
      ...state,
      notificationsEl: null,
    }));
  };

  const { notifications, notificationsCount, notificationsEl } = state;

  const rootClassName = classNames(classes.root, className);
  const showNotifications = Boolean(notificationsEl);

  return (
    <>
      <div className={rootClassName}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            onClick={onToggleSidebar}
            variant="text"
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography className={classes.title} variant="h4">
            {title}
          </Typography>
          <IconButton
            className={classes.notificationsButton}
            onClick={handleShowNotifications}
          >
            <Badge
              badgeContent={notificationsCount}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className={classes.signOutButton} onClick={handleSignOut}>
            <SignoutIcon />
          </IconButton>
        </Toolbar>
      </div>
      <Popover
        anchorEl={notificationsEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleCloseNotifications}
        open={showNotifications}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <NotificationList
          notifications={notifications}
          onSelect={handleCloseNotifications}
        />
      </Popover>
    </>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string,
};

Topbar.defaultProps = {
  onToggleSidebar: () => {},
};

export default compose(
  withRouter,
  withStyles(styles),
)(Topbar);
