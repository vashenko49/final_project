import * as FOOTERLINKSID from '../constants/footerLinksId';

const initState = {
  id: ''
};

export default function(state = initState, action) {
  switch (action.type) {
    case FOOTERLINKSID.SAVE_LINKGROUP_ID:
      return {
        ...state,
        id: action.payload
      };

    default:
      return state;
  }
}
