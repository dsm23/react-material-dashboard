import React, { useCallback, useEffect, useRef, useState } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Shared layouts
import DashboardLayout from 'layouts/Dashboard';

// Shared services
import { getUsers } from 'services/user';

// Custom components
import UsersToolbar from './components/UsersToolbar';
import UsersTable from './components/UsersTable';

// Component styles
import styles from './style';

const UserList = ({ classes }) => {
  const signal = useRef(true);

  const [state, setState] = useState({
    isLoading: false,
    limit: 10,
    users: [],
    selectedUsers: [],
    error: null,
  });

  const { isLoading, limit, users, selectedUsers, error } = state;

  const makeFetch = useCallback(async limit => {
    try {
      setState(state => ({ ...state, isLoading: true }));

      const { users } = await getUsers(limit);

      if (signal.current) {
        setState(state => ({
          ...state,
          isLoading: false,
          users,
        }));
      }
    } catch (error) {
      if (signal.current) {
        setState(state => ({
          ...state,
          isLoading: false,
          error,
        }));
      }
    }
  }, []);

  useEffect(() => {
    signal.current = true;
    makeFetch(limit);
    return () => {
      signal.current = false;
    };
  }, [limit, makeFetch]);

  const handleSelect = selectedUsers => {
    setState(state => ({ ...state, selectedUsers }));
  };

  const renderUsers = () => {
    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return <UsersTable onSelect={handleSelect} users={users} />;
  };

  return (
    <DashboardLayout title="Users">
      <div className={classes.root}>
        <UsersToolbar selectedUsers={selectedUsers} />
        <div className={classes.content}>{renderUsers()}</div>
      </div>
    </DashboardLayout>
  );
};

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
