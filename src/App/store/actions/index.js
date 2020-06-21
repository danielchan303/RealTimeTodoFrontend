import * as authActions from './auth';
import * as todoListsActions from './todoLists';
import * as networkActions from './socket';

export default {...authActions, ...todoListsActions, ...networkActions};