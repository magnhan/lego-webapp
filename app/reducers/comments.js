// @flow

import { Comment } from 'app/actions/ActionTypes';
import createEntityReducer from 'app/utils/createEntityReducer';
import getEntityType from 'app/utils/getEntityType';

/**
 * Used by the individual entity reducers
 */
export function mutateComments(forTargetType: string) {
  return (state: any, action: any) => {
    switch (action.type) {
      case Comment.ADD_SUCCESS: {
        const [serverTargetType, targetId] = action.meta.commentTarget.split('-');
        const targetType = getEntityType(serverTargetType);

        if (targetType !== forTargetType) {
          return state;
        }

        return {
          ...state,
          byId: {
            ...state.byId,
            [targetId]: {
              ...state.byId[targetId],
              comments: [...state.byId[targetId].comments, action.payload.result]
            }
          }
        };
      }

      default:
        return state;
    }
  };
}

export default createEntityReducer({
  key: 'comments',
  types: [Comment.FETCH, Comment.FETCH_SUCCESS, Comment.FETCH_FAILURE]
});