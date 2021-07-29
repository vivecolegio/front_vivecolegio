import { NotificationManager } from '../components/common/Notifications';

export const createNotification = (type: any, message: any, className: any) => {
  const cName = className || '';
  switch (type) {
    case 'info':
      NotificationManager.info('Info message', message, 3000, null, null, cName);
      break;
    case 'success':
      NotificationManager.success('Success message', message, 3000, null, null, cName);
      break;
    case 'warning':
      NotificationManager.warning('Warning message', message, 3000, null, null, cName);
      break;
    case 'error':
      NotificationManager.error(
        'Error message',
        message,
        5000,
        null,
        null,
        cName,
      );
      break;
    default:
      NotificationManager.info('Info message', null, null, null, null, null);
      break;
  }
};
