import { withAuthentication } from '../../core/utils/withAuthentication';
import { withErrorHandler } from '../../core/utils/withErrorHandler';
import { deleteNotification } from '../notification.controller';

export const DELETE = withErrorHandler(withAuthentication(deleteNotification));
