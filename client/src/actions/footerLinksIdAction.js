import * as FOOTERLINKSID from '../constants/footerLinksId';

export function onFooterLinkClick(id) {
  return {
    type: FOOTERLINKSID.SAVE_LINKGROUP_ID,
    payload: id
  };
}
