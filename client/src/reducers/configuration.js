import * as CONFIGURATION from '../constants/configuration';

const initialState = {
  cloudinary_cloud_name: '',
  google_clientID: '',
  facebook_clientID: '',
  github_clientID: '',
  errorConfig: false,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONFIGURATION.CONFIGURATION_API_REQUEST:
      return {
        ...state,
        loading: false
      };
    case CONFIGURATION.CONFIGURATION_API_FAILED:
      return {
        ...state,
        errorConfig: true,
        loading: true
      };
    case CONFIGURATION.CONFIGURATION_API_SUCCEEDED:
      return {
        ...state,
        cloudinary_cloud_name: payload.cloudinary_cloud_name,
        google_clientID: payload.google_clientID,
        facebook_clientID: payload.facebook_clientID,
        github_clientID: payload.github_clientID,
        errorConfig: false,
        loading: true
      };
    default:
      return state;
  }
}
