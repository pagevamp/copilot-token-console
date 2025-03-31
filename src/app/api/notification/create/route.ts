import { withAuthentication } from '../../core/utils/withAuthentication';
import { withErrorHandler } from '../../core/utils/withErrorHandler';
import { createNotification } from '../notification.controller';

export const POST = withErrorHandler(withAuthentication(createNotification));
