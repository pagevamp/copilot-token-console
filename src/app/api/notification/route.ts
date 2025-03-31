import { withAuthentication } from '../core/utils/withAuthentication';
import { withErrorHandler } from '../core/utils/withErrorHandler';
import { getNotifications } from './notification.controller';

export const GET = withErrorHandler(withAuthentication(getNotifications));
