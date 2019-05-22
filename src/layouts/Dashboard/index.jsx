import React, { useState } from 'react';

// Externals
import cn from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

// Material components
import Drawer from '@material-ui/core/Drawer';

// Custom components
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Footer from './components/Footer';

// Component styles
import styles from './styles';

const DashboardLayout = ({ classes, width, title, children }) => {
  const isMobile = ['xs', 'sm', 'md'].includes(width);

  const [isOpen, setOpen] = useState(!isMobile);

  const handleClose = () => setOpen(false);

  const handleToggleOpen = () => setOpen(!isOpen);

  const shiftComponents = isOpen && !isMobile;

  return (
    <>
      <Topbar
        className={cn(classes.topbar, {
          [classes.topbarShift]: shiftComponents,
        })}
        isSidebarOpen={isOpen}
        onToggleSidebar={handleToggleOpen}
        title={title}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={handleClose}
        open={isOpen}
        variant={isMobile ? 'temporary' : 'persistent'}
      >
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <main
        className={cn(classes.content, {
          [classes.contentShift]: shiftComponents,
        })}
      >
        {children}
        <Footer />
      </main>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(DashboardLayout);
