// Mock data
import notifications from 'data/notifications';
// const notifications = [];

export const getNotifications = (limit = 6) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        notifications: notifications.slice(0, limit),
        notificationsCount: notifications.length,
      });
    }, 700);
  });
