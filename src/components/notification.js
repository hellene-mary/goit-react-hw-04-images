import { toast } from 'react-toastify';

export const notificationError = () => toast.error('Nothing was found for your request. Try again!');
export const notificationInfo = () => toast.info('Write something and we will find it!');
export const notificationServerError = () => toast.error('Oops! Something has gone wrong. Try again!');
export const notificationSuccess = total => toast.success(`Hooray! We found ${total} images.`);
