const appReducer = (state, action) => {
  console.log({ action });
  switch(action.type) {
    case 'HAS_ACCESS_TOKEN':
      return {
        ...state,
        hasAccessToken: true
      }
    case 'SET_CURRENT_PROFILE':
      return {
        ...state,
        currentProfile: action.currentProfile
      }
    case 'SET_CURRENTLY_PLAYING':
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying
      }
    default:
      return state
  }
};

export default appReducer;
